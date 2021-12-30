import React from "react";

import Svg, { Path } from "react-native-svg";
import { iconTypes } from "./types";
export const Menu = (props: iconTypes) => {
  const { color = "black", height = "28", width = "27" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.6294 3.92383L14.5 1L14.3757 3.80667C10.9688 2.27876 7.34328 2.47076 4.99269 4.64632C1.52998 7.85118 2.14525 14.1469 6.36692 18.7082C10.5886 23.2696 16.818 24.3692 20.2807 21.1643C22.7957 18.8366 23.1595 14.8784 21.5527 11.1384L25 11L21.4277 10.8565C20.8278 9.54562 19.9848 8.26744 18.9065 7.10241C18.8992 7.09458 18.892 7.08676 18.8847 7.07895L21.9246 3.92893L18.6307 6.8122C17.4132 5.56489 16.0435 4.59575 14.6294 3.92383ZM14.3278 4.88864C13.3859 4.42722 12.427 4.11202 11.4911 3.94682C10.0271 3.68838 8.64498 3.79807 7.45877 4.26452L14.0982 10.0761L14.3278 4.88864ZM7.41574 4.28163C6.76916 4.54163 6.18167 4.90845 5.67194 5.38022C4.21956 6.72445 3.56793 8.764 3.79342 11.0713C4.019 13.3796 5.12468 15.8939 7.10082 18.029C7.1033 18.0317 7.10577 18.0343 7.10825 18.037L13.5299 11.3827L4 11L13.5299 10.6173L7.41574 4.28163ZM7.11096 18.0399C9.08524 20.1685 11.5023 21.4614 13.7823 21.8638C16.0653 22.2668 18.1491 21.7747 19.6015 20.4304C20.4327 19.661 21.0017 18.6639 21.294 17.5191L14.9018 11.9239L14.5 21L14.0982 11.9239L7.11096 18.0399ZM21.3141 17.4384C21.5163 16.6049 21.5734 15.6951 21.48 14.7393C21.3668 13.5807 21.0318 12.3701 20.4762 11.1817L15.4701 11.3827L21.3141 17.4384ZM20.2955 10.8111C19.7647 9.76712 19.0624 8.74635 18.1892 7.79966L15.4701 10.6173L20.2955 10.8111ZM17.877 7.47188L14.9018 10.0761L14.6801 5.06849C15.8 5.66357 16.8885 6.46685 17.877 7.47188Z"
        fill={color}
      />
    </Svg>
  );
};

export default Menu;
