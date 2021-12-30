import termCondition from 'assets/termCondition.png';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import { appFonts } from 'components/text';
import { Container } from 'components/workAround';
import { htmlContent } from 'data/termsAndCondition';
import { isIphone } from 'lib/isIphone';
import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';

import { iconColor, textColor } from '../../config/colors';
import styles from './style';

export default function TermsAndCondition() {
    const contentWidth = useWindowDimensions().width;

    return (
        <Container>
            <View key="termsAndCondition" style={styles.container}>
                <StatusBar
                    backgroundColor={textColor}
                    barStyle="dark-content"
                />

                <Header
                    style={{
                        paddingTop: isIphone(),
                        borderBottomColor: iconColor,
                        borderBottomWidth: 1.5,
                    }}
                    textStyle={{
                        color: iconColor,
                        fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                    }}
                    back
                    color={iconColor}
                />
                <HeaderHeading
                    title={'Terms + Conditions'}
                    icon={termCondition}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}>
                    <HTML
                        source={{ html: htmlContent }}
                        contentWidth={contentWidth}
                    />
                </ScrollView>
            </View>
        </Container>
    );
}
