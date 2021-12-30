import ApiConfig from 'config/api-config';
import AppState from 'models/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { AppState as AppListener } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { socketEvent } from 'store/actions/appAction';

export default function Connection() {
    const userId = useSelector((state: AppState) => state.user._id);
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
    const [appStateVisible, setAppStateVisible] = useState('inactive');
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch();
    const webSocket = useRef(null);

    // TODO isConnected is not used for now so adding the console and will remove it later
    console.log(isConnected);

    useEffect(() => {
        AppListener.addEventListener('change', _handleAppStateChange);

        return () => {
            AppListener.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = nextAppState => {
        setAppStateVisible(nextAppState);
    };

    useEffect(() => {
        try {
            const connectToWebSocket = () => {
                const sender_id = userId;
                webSocket.current = new WebSocket(
                    `${ApiConfig.WEB_SOCKET_URL}sender_id=${sender_id}&channel=community`,
                );
            };
            if (userId !== 0 && userId !== null && userId !== undefined) {
                webSocket.current?.close();

                connectToWebSocket();
            }
            if (webSocket.current !== null) {
                webSocket.current.onopen = () => {
                    setIsConnected(true);
                    if (
                        webSocket.current !== null &&
                        appStateVisible == 'active' &&
                        isLoggedIn
                    ) {
                        webSocket.current?.send(
                            JSON.stringify({
                                action: 'sendMessage',
                                sender_id: userId,
                                receiver_id: userId,
                                content: 'cohart@broadcast',
                            }),
                        );
                    } else if (appStateVisible !== 'active' || !isLoggedIn) {
                        if (webSocket.current !== null) {
                            webSocket.current?.send(
                                JSON.stringify({
                                    action: 'sendMessage',
                                    sender_id: userId,
                                    receiver_id: userId,
                                    content: 'cohart@broadcast_close',
                                }),
                            );
                        }
                    }
                };
            }

            if (webSocket.current !== null) {
                webSocket.current.onerror = () => {
                    setIsConnected(false);

                    connectToWebSocket();
                };
                webSocket.current.onmessage = e => {
                    const message = JSON.parse(e.data);

                    const message_hash = message?.messages[0]?.content; //504faf231fa94a0ca7e51f599dc29af3#live_yes
                    const msg_array = String(message_hash)?.split('#');
                    if (
                        message?.messages[0]?.content &&
                        msg_array[1] == 'live_yes'
                    ) {
                        // do something
                        setTimeout(() => {
                            const data = {
                                user_id: msg_array[0],
                                is_live: true,
                            };
                            dispatch(socketEvent(data));
                        }, 200);
                    } else if (msg_array[1] == 'live_no') {
                        dispatch(socketEvent(null));

                        setTimeout(() => {
                            const data = {
                                user_id: msg_array[0],
                                is_live: false,
                            };
                            dispatch(socketEvent(data));
                        }, 200);
                    }

                    // here you can split and
                };
            }
        } catch (error) {
            // TODO handle error exception 
        }

        return () => {
            try {
                if (webSocket.current !== null) {
                    webSocket.current?.close();
                    webSocket.current.onclose = () => {
                        //   setIsConnected(false);
                    };
                }
            } catch (error) {
                // TODO handle error exception 
            }
        };
    }, [userId, appStateVisible, isLoggedIn]);

    return <></>;
}
