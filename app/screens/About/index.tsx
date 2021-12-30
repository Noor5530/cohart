import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import { CohartIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { Container } from 'components/workAround';
import { isIphone } from 'lib/isIphone';
import React from 'react';
import {  ScrollView, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {AboutIcon} from 'components/Icons'
import { iconColor, textColor } from '../../config/colors';
import styles from './style';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const VERSION = DeviceInfo.getVersion();
const BUILD = DeviceInfo.getBuildNumber();

const About = () => {
    return (
      <Container>
        <View key="about" style={{ flex: 1, backgroundColor: textColor }}>
          <StatusBar backgroundColor={textColor} barStyle="dark-content" />
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
            title={"About"}
            renderIcon={
              <View style={styles.icon}>
                <AboutIcon
                  width={widthPercentageToDP("15")}
                  height={widthPercentageToDP("15")}
                />
              </View>
            }
            drawer={false}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            <CohartIcon />
            <Text style={styles.heading}>
              Connecting the Creative{"\n"}Community
            </Text>
            <Text style={styles.versionInfo}>
              VERSION {VERSION} ({BUILD})
            </Text>
            <Text style={styles.description}>
              Cohart is a female-founded platform which enables visual creators
              and their audiences to build authentic connections and
              communities.{"\n\n"}
              Our focus is on unlocking new ways for visual creators to monetize
              their passions, while building an experience for audiences to
              interact with these creators in a fun and engaging way.{"\n\n"}
              Cohart is for for everyone. We make art discovery accessible by
              opening windows into the worlds of creators.
            </Text>
          </ScrollView>
        </View>
      </Container>
    );
};
export default React.memo(About);
