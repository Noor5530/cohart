import { AppText } from 'components/text';
import AppState from 'models/reducers';
import React, { FC } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';
import { Input } from 'utils/uiPrimitives';

interface AffiliationsEditorProps extends ViewProps {
    data: string[];
    setData: (data: string[]) => void;
    style: ViewStyle;
}
export const AffiliationsEditor: FC<AffiliationsEditorProps> = (props: AffiliationsEditorProps) => {
    const { data, setData } = props;

    return (
        <View {...props} style={[{ flexWrap: 'wrap' }, props.style]}>
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

export const Affiliations: FC<ViewProps> = (props: ViewProps) => {
    const affiliations = useSelector(
        (state: AppState) => state.user.affiliations,
    );

    return (
        <View {...props} style={[{ flexWrap: 'wrap' }, props.style]}>
            {affiliations.map((place, index) => {
                const last = index === affiliations.length - 1;
                return (
                    <View
                        key={index}
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            marginRight: 5,
                            marginBottom: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 3,
                            flexDirection: 'row',
                        }}>
                        <AppText
                            style={{ marginRight: last ? 0 : 16 }}
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

interface IUserAffiliationsProps {
    data: string;
    style: ViewStyle;
}

export const UserAffiliations = (props: IUserAffiliationsProps) => {
    const affiliations = props.data?.split(',');

    return (
        <View {...props} style={[{ flexWrap: 'wrap' }, props.style]}>
            {affiliations.map((place: string, index: number) => {
                const last = index === affiliations.length - 1;
                return (
                    <View
                        key={index}
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            marginRight: 5,
                            marginBottom: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 3,
                            flexDirection: 'row',
                        }}>
                        <AppText style={{ marginRight: last ? 0 : 16 }}>
                            <Fontisto name={'plus-a'} color="black" size={14} />{' '}
                            {place}
                        </AppText>
                    </View>
                );
            })}
        </View>
    );
};
