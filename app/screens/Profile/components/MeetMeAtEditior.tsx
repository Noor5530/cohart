import { AppText } from 'components/text';
import AppState from 'models/reducers';
import React, { FC } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';
import { Input } from 'utils/uiPrimitives';

interface MeetMeAtEditorProps extends ViewProps {
    data: string[];
    setData: (data: string[]) => void;
    style: ViewStyle;
}
export const MeetMeAtEditor: FC<MeetMeAtEditorProps> = (props: MeetMeAtEditorProps) => {
    const { data, setData } = props;

    return (
        <View
            {...props}
            style={[{ flexDirection: 'row', flexWrap: 'wrap' }, props.style]}>
            {data.map((place, index) => {
                return (
                    <Input
                        maxLength={25}
                        key={index}
                        style={{ marginBottom: 5, width: 150, marginRight: 10 }}
                        value={place}
                        placeholder={'+ Add new entry'}
                        onChangeText={text => {
                            const temp = [...data];

                            temp[index] = text.substring(0, 25);
                            if (index == data?.length - 1) {
                                setData([...temp, '']);
                            } else {
                                setData(temp);
                            }
                        }}
                    />
                );
            })}
        </View>
    );
};


export const MeetMeAt: FC<ViewProps> = (props: ViewProps) => {
    const meet_me_at = useSelector((state: AppState) => state.user.meet_me_at);
    return (
        <View
            {...props}
            style={[{ flexDirection: 'row', flexWrap: 'wrap' }, props.style]}>
            {meet_me_at.map((place, index) => {
                const last = index === meet_me_at.length - 1;
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',

                            borderWidth: 1,
                            borderRadius: 10,
                            marginRight: 5,
                            marginBottom: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 3,
                        }}>
                        <AppText
                            style={{
                                marginRight: last ? 0 : 16,
                            }}
                            key={index}>
                            <Fontisto name={'plus-a'} color="black" size={14} />{' '}
                            {place}
                        </AppText>
                    </View>
                );
            })}
        </View>
    );
};

interface IMeetMeAtOtherProps {
    data?: any;
    style: ViewStyle;
}

export const MeetMeAtOtherUser = (props: IMeetMeAtOtherProps) => {
    const meet_me_at = props.data?.split(',');
    return (
        <View
            {...props}
            style={[
                {
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                },
                props.style,
            ]}>
            {meet_me_at.map((place: string, index: number) => {
                const last = index === meet_me_at.length - 1;
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginRight: 5,
                            marginBottom: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 3,
                        }}>
                        <AppText
                            style={{
                                marginRight: last ? 0 : 16,
                            }}>
                            <Fontisto name={'plus-a'} color="black" size={14} />{' '}
                            {place}
                        </AppText>
                    </View>
                );
            })}
        </View>
    );
};
