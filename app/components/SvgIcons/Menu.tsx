import React from "react";

import Svg, { Path } from "react-native-svg";
import { iconTypes } from "./types";
export const Menu = (props: iconTypes) => {
  const { color = "black", height = "16", width = "24" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.90625e-05 1.67187C3.90625e-05 1.02467 0.524705 0.5 1.17191 0.5H22.2657C22.9129 0.5 23.4375 1.02467 23.4375 1.67187C23.4375 2.31908 22.9129 2.84375 22.2657 2.84375H1.17191C0.524705 2.84375 3.90625e-05 2.31908 3.90625e-05 1.67187ZM0 7.92276C0 7.27555 0.524666 6.75089 1.17187 6.75089H22.2656C22.9128 6.75089 23.4375 7.27555 23.4375 7.92276C23.4375 8.56997 22.9128 9.09463 22.2656 9.09463H1.17187C0.524666 9.09463 0 8.56997 0 7.92276ZM1.17187 12.9994C0.524666 12.9994 0 13.524 0 14.1712C0 14.8184 0.524666 15.3431 1.17187 15.3431H22.2656C22.9128 15.3431 23.4375 14.8184 23.4375 14.1712C23.4375 13.524 22.9128 12.9994 22.2656 12.9994H1.17187Z"
        fill={color}
      />
    </Svg>
  );
};

export default Menu;
