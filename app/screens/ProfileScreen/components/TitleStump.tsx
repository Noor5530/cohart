import { appFonts } from "components/text";
import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import Svg, { Path, Text, TextPath, TSpan } from "react-native-svg";

interface IProps extends ViewProps {
  text: string;
}

const ProfileBadge: FC<ViewProps & { text: string }> = (props: IProps) => {
  return (
    <View {...props}>
      <View>
        <Svg height="100%" width="100%" viewBox="0 0 200 200" {...props}>
          <Path
            id="curve"
            d="M 64,0 A 64,64 0 0 1 -64,0 A 64,64 0 0 1 64,0"
            transform={"translate(100,100)"}
            stroke="none"
            fill="none"
          />
          <Text
            transform={"translate(100,100)"}
            fill={"#0033F7"}
            fontFamily={appFonts.SpaceGrotesk}
            fontSize={14.8}
          >
            <TextPath href="#curve">
              <TSpan>
                {new Array(6)
                  .fill(props?.text?.toLocaleUpperCase())
                  .join("\xa0\xa0·\xa0\xa0") + "\xa0\xa0·\xa0\xa0"}
              </TSpan>
            </TextPath>
          </Text>
        </Svg>
      </View>
    </View>
  );
};
export default React.memo(ProfileBadge);
