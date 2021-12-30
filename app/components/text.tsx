import React, { FC } from 'react';
import { Platform, Text, TextProps } from 'react-native';

const InterBlack = 'Inter-Black';
const InterBold = 'Inter-Bold';
const InterExtraBold = 'Inter-ExtraBold';
const InterExtraLight = 'Inter-ExtraLight';
const InterLight = 'Inter-Light';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';
const InterSemiBold = 'Inter-SemiBold';
const InterThin = 'Inter-Thin';
const SpaceGrotesk = InterRegular;
const AktivGroteskEx_Trial_Bd =
  Platform.OS === 'android'
    ? 'AktivGroteskEx-Trial-Bd'
    : 'AktivGroteskExTrial-Bold';

export const appFonts = {
  InterRegular,
  InterBold,
  InterMedium,
  SpaceGrotesk,
  InterExtraLight,
  InterSemiBold,
  AktivGroteskEx_Trial_Bd,
  InterLight,
  InterBlack,
  InterExtraBold,
  InterThin,
};

interface CustomTextProps extends TextProps {
  light?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  center?: boolean;
  children: JSX.Element;
}

type FontName = keyof typeof appFonts;

type FontMap = {
  regular: FontName;
  light?: FontName;
  medium?: FontName;
  semibold?: FontName;
  bold?: FontName;
};

const CustomFontText = (fontMap: FontMap): FC<TextProps & CustomTextProps> => {
  return (props: CustomTextProps) => {
    const { light, medium, semibold, bold } = props;
    let fontFamily = fontMap.regular;
    if (light && fontMap.light) {
      fontFamily = fontMap.light;
    } else if (medium && fontMap.medium) {
      fontFamily = fontMap.medium;
    } else if (semibold && fontMap.semibold) {
      fontFamily = fontMap.semibold;
    } else if (bold && fontMap.bold) {
      fontFamily = fontMap.bold;
    }

    return (
      <Text
        {...props}
        style={[
          { fontFamily, textAlign: props.center ? 'center' : undefined },
          props.style,
        ]}>
        {props.children}
      </Text>
    );
  };
};

export const AppText = CustomFontText({
  regular: InterRegular,
  medium: InterMedium,
  bold: InterBold,
});

export const AccentText = CustomFontText({
  regular: SpaceGrotesk,
  light: InterExtraLight,
  medium: InterMedium,
  semibold: InterSemiBold,
  bold: InterBold,
});
