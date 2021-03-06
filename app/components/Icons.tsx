import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

interface IPropRightIcon {
  color?: string;
}

export const RightIcon = (props: IPropRightIcon) => {
  return (
    <Svg width="14" height="8" viewBox="0 0 14 8" fill="none">
      <Path
        d="M9.91734 1L13 4.08266L9.91734 7.16531"
        stroke={props.color ? props.color : "#0033F7"}
        stroke-width="0.801834"
      />
      <Path
        d="M13 4.08203L-2.21919e-06 4.08203"
        stroke={props.color ? props.color : "#0033F7"}
        stroke-width="0.801834"
      />
    </Svg>
  );
};

export const CrossIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "black", height = "16", width = "15" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.50055 6.75843L0.742174 0L0 0.742168L6.75838 7.5006L0 14.259L0.742174 15.0012L7.50055 8.24277L14.2589 15.0012L15.0011 14.259L8.24272 7.5006L15.0011 0.742168L14.2589 0L7.50055 6.75843Z"
        stroke={color}
        fill={"black"}
      />
    </Svg>
  );
};

export const SearchIcon = (props: {
  color?: string;
  width?: string;
  height?: string;
}) => {
  const { color = "#E5E5E5", width = 17, height = 17 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.8066 11.177L10.9611 11.0225C13.1276 8.77361 13.102 5.19416 10.8845 2.97665C8.64118 0.733308 5.00401 0.733308 2.76067 2.97665C0.51733 5.21999 0.51733 8.85716 2.76067 11.1005C4.97821 13.318 8.5577 13.3435 10.8066 11.177ZM11.2392 12.1948C8.57193 14.4844 4.54891 14.3658 2.02214 11.839C-0.629082 9.18781 -0.629082 4.88934 2.02214 2.23812C4.67336 -0.413104 8.97184 -0.413104 11.6231 2.23812C14.1502 4.76529 14.2685 8.78917 11.9778 11.4564L16.539 16.0176L15.8005 16.7561L11.2392 12.1948Z"
        fill={color}
      />
    </Svg>
  );
};
export const GlowIcon = (props: {
  color?: string;
  width?: string;
  height?: string;
}) => {
  const { color = "#E5E5E5", width = 25, height = 25 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.58975 7.6365L7.90685 7.56757L7.97303 7.24989L8.91211 2.7423L9.85119 7.24989L9.91737 7.56757L10.2345 7.6365L14.3075 8.52195L10.255 9.22674L9.92356 9.28438L9.85209 9.61313L8.91211 13.9371L7.97213 9.61313L7.90066 9.28438L7.56921 9.22674L3.51669 8.52195L7.58975 7.6365Z"
        fill="white"
        stroke={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.9121 15.4304V19.2908H16.4121V15.4304H19.1621V14.9304H16.4121V11.2908H15.9121V14.9304H13.1621V15.4304H15.9121Z"
        fill="white"
      />
    </Svg>
  );
};

export const SendRequestICon = () => {
  return (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <Path
        d="M11.5324 11.1968C12.0479 10.928 12.6381 10.7749 13.2666 10.7749H13.2687C13.3326 10.7749 13.3625 10.7005 13.3156 10.6591C12.662 10.0897 11.9154 9.62984 11.1063 9.2983C11.0978 9.29416 11.0892 9.29209 11.0807 9.28796C12.4037 8.35523 13.2645 6.83929 13.2645 5.12895C13.2645 2.29562 10.9039 0 7.9915 0C5.07913 0 2.72068 2.29562 2.72068 5.12895C2.72068 6.83929 3.5814 8.35523 4.90656 9.28796C4.89804 9.29209 4.88952 9.29416 4.881 9.2983C3.92867 9.68917 3.07434 10.2496 2.33933 10.9652C1.60855 11.6733 1.02676 12.5127 0.626416 13.4366C0.232517 14.3413 0.0199339 15.3107 5.32749e-05 16.2927C-0.000515362 16.3148 0.00347296 16.3367 0.0117834 16.3573C0.0200938 16.3778 0.032558 16.3966 0.0484417 16.4124C0.0643254 16.4282 0.0833072 16.4407 0.104268 16.4493C0.12523 16.4579 0.147747 16.4623 0.170492 16.4623H1.44665C1.53826 16.4623 1.61496 16.3899 1.61709 16.301C1.6597 14.7044 2.31802 13.2091 3.4834 12.0758C4.68712 10.9032 6.28925 10.2579 7.99364 10.2579C9.20162 10.2579 10.3606 10.5826 11.3598 11.1906C11.3855 11.2063 11.4149 11.2151 11.4452 11.2162C11.4755 11.2173 11.5056 11.2106 11.5324 11.1968ZM7.99364 8.68613C7.01787 8.68613 6.09963 8.31594 5.40723 7.6438C5.06655 7.31395 4.79647 6.92193 4.61255 6.49032C4.42863 6.0587 4.33451 5.59603 4.33559 5.12895C4.33559 4.17968 4.71695 3.28625 5.40723 2.61411C6.0975 1.94197 7.01574 1.57178 7.99364 1.57178C8.97153 1.57178 9.88764 1.94197 10.58 2.61411C10.9207 2.94396 11.1908 3.33598 11.3747 3.76759C11.5586 4.1992 11.6528 4.66187 11.6517 5.12895C11.6517 6.07822 11.2703 6.97165 10.58 7.6438C9.88764 8.31594 8.9694 8.68613 7.99364 8.68613ZM15.8296 13.6083H14.04V11.871C14.04 11.78 13.9633 11.7056 13.8695 11.7056H12.6764C12.5827 11.7056 12.506 11.78 12.506 11.871V13.6083H10.7164C10.6227 13.6083 10.546 13.6827 10.546 13.7737V14.9319C10.546 15.0229 10.6227 15.0973 10.7164 15.0973H12.506V16.8346C12.506 16.9255 12.5827 17 12.6764 17H13.8695C13.9633 17 14.04 16.9255 14.04 16.8346V15.0973H15.8296C15.9233 15.0973 16 15.0229 16 14.9319V13.7737C16 13.6827 15.9233 13.6083 15.8296 13.6083Z"
        fill="black"
      />
    </Svg>
  );
};

export const CheckMarkIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "none", height = "19", width = "28" } = props;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path
        opacity={color !== "none" ? "1" : "0.2"}
        d="M0.445312 8.79409L9.60619 17.955L26.7828 0.77832"
        stroke={color}
        stroke-width="1.00092"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export const UnionIcon = () => {
  return (
    <Svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.41294 0.649994H1.35C0.604416 0.649994 0 1.25441 0 1.99999V9.99999C0 10.7456 0.604416 11.35 1.35 11.35H9.35C10.0956 11.35 10.7 10.7456 10.7 9.99999V1.99999C10.7 1.25441 10.0956 0.649994 9.35 0.649994H6.28701C6.14514 0.27033 5.77913 0 5.34998 0C4.92083 0 4.55481 0.27033 4.41294 0.649994ZM1.35 1.34999C0.991015 1.34999 0.7 1.64101 0.7 1.99999V9.99999C0.7 10.359 0.991015 10.65 1.35 10.65H9.35C9.70899 10.65 10 10.359 10 9.99999V1.99999C10 1.64101 9.70899 1.34999 9.35 1.34999H1.35ZM8.34998 3.3V4H2.34998V3.3H8.34998ZM7.34998 6H2.34998V5.3H7.34998V6ZM2.34998 7.3V8H6.34998V7.3H2.34998Z"
        fill="black"
      />
    </Svg>
  );
};

export const BackIcon = () => {
  return (

    <Svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.64474 0.583984L0.433134 6.79559L0.167969 7.06076L0.433134 7.32592L6.64474 13.5375L7.17507 13.0072L1.66787 7.5L21 7.5V6.75L1.53939 6.75L7.17507 1.11431L6.64474 0.583984Z" fill="black" />
    </Svg>

  );
};

export const MenuIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "#cbcfa9" } = props;
  return (
    <Svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.697418 7.05469H21.0734"
        stroke={color}
        stroke-width="1.07242"
      />
      <Path
        d="M0.697662 0.618164H21.0736"
        stroke={color}
        stroke-width="1.07242"
      />
      <Path
        d="M0.697418 13.4863H21.0734"
        stroke={color}
        stroke-width="1.07242"
      />
    </Svg>
  );
};

export const StarIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "#E8FC48" } = props;
  return (
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.84599 18.376V0.801758"
        stroke={color}
        stroke-width="1.07242"
        stroke-miterlimit="10"
      />
      <Path
        d="M17.6332 9.59082H0.0587821"
        stroke={color}
        stroke-width="1.07242"
        stroke-miterlimit="10"
      />
      <Path
        d="M15.0593 15.801L2.6324 3.37402"
        stroke={color}
        stroke-width="1.07242"
        stroke-miterlimit="10"
      />
      <Path
        d="M15.0593 3.37402L2.6324 15.801"
        stroke={color}
        stroke-width="1.07242"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export const ChatSendIcon = () => {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.3601 13.3939L17.3601 0.706411L17.3601 0.399288L17.053 0.399287L5.51679 0.399288V1.01353L16.3122 1.01353L0.351552 16.9742L0.78589 17.4086L16.7459 1.44859L16.7458 13.3939L17.3601 13.3939Z"
        fill="white"
      />
    </Svg>
  );
};
export const CohartIcon = () => {
  return (
    <Svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.6002 22.5478V0H23.3985V22.5495L7.45346 6.60432L6.60375 7.45403L22.5544 23.4048H0V24.6065H22.5415L6.60375 40.5444L7.45346 41.3941L23.3985 25.4489V47.998H24.6002V25.4506L40.5435 41.3941L41.3932 40.5444L25.4555 24.6065H47.9985V23.4048H25.4426L41.3932 7.45403L40.5435 6.60432L24.6002 22.5478Z"
        fill="black"
      />
    </Svg>
  );
};

export const EditIcon = () => {
  return (
    <Svg
      width="20"
      height="4"
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
        fill="black"
      />
      <Path
        d="M10 4C11.1046 4 12 3.10457 12 2C12 0.89543 11.1046 0 10 0C8.89543 0 8 0.89543 8 2C8 3.10457 8.89543 4 10 4Z"
        fill="black"
      />
      <Path
        d="M18 4C19.1046 4 20 3.10457 20 2C20 0.89543 19.1046 0 18 0C16.8954 0 16 0.89543 16 2C16 3.10457 16.8954 4 18 4Z"
        fill="black"
      />
    </Svg>
  );
};

export const LogoICon = () => {
  return (
    <Svg
      width="308"
      height="47"
      viewBox="0 0 308 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M37.5623 29.831C36.8649 32.6183 35.4719 34.6874 33.382 36.0402C31.2909 37.3917 28.4224 38.069 24.7746 38.069C20.2657 38.069 16.7413 36.7474 14.2007 34.1036C11.6589 31.4598 10.3886 27.7815 10.3886 23.068C10.3886 18.3954 11.6589 14.7275 14.2007 12.0635C16.7413 9.39961 20.204 8.06764 24.5908 8.06764C27.9509 8.06764 30.6057 8.70401 32.5521 9.97368C34.499 11.2446 35.9849 13.3351 37.009 16.2445L46.7841 15.0768C44.1617 5.03545 36.7635 0.0141602 24.5908 0.0141602C19.5903 0.0141602 15.2456 0.988247 11.5575 2.93459C7.86883 4.88155 5.04979 7.58641 3.10405 11.0498C1.1571 14.5131 0.183594 18.5188 0.183594 23.0686C0.183594 27.8645 1.18763 32.004 3.19627 35.4875C5.20369 38.971 8.05328 41.6148 11.7414 43.4176C15.4307 45.2204 19.7344 46.1225 24.6525 46.1225C31.2091 46.1225 36.4869 44.7093 40.4834 41.881C44.4793 39.0528 46.8257 35.0362 47.5225 29.8317H37.5623V29.831Z"
        fill="black"
      />
      <Path
        d="M90.0643 34.1048C87.3992 36.748 83.6702 38.0702 78.8755 38.0702C74.0386 38.0702 70.2882 36.759 67.6243 34.1354C64.9603 31.5136 63.6284 27.8249 63.6284 23.0692C63.6284 18.3563 64.9603 14.6774 67.6243 12.0342C70.2882 9.39046 74.0184 8.06886 78.8138 8.06886C83.6494 8.06886 87.3992 9.38068 90.0643 12.0031C92.7277 14.6273 94.0603 18.3154 94.0603 23.0692C94.0603 27.7821 92.7283 31.461 90.0643 34.1048ZM101.1 10.6809C98.9887 7.21753 96.0378 4.57436 92.2471 2.75016C88.4557 0.92718 84.0183 0.0141602 78.9372 0.0141602C73.6502 0.0141602 69.0894 0.967485 65.2584 2.87291C61.4255 4.77895 58.4959 7.46365 56.4665 10.927C54.4384 14.3904 53.4233 18.4376 53.4233 23.0686C53.4233 27.8652 54.4793 31.993 56.5899 35.4569C58.7005 38.9209 61.6515 41.5641 65.4428 43.3871C69.2335 45.21 73.671 46.1224 78.7533 46.1224C84.0403 46.1224 88.5987 45.1691 92.4315 43.2637C96.2625 41.3577 99.1945 38.6736 101.223 35.2096C103.252 31.7469 104.266 27.6997 104.266 23.0674C104.266 18.2733 103.211 14.1449 101.1 10.6809Z"
        fill="black"
      />
      <Path
        d="M156.03 45.0129V1.11719H146.194V18.0853H122.217V1.11719H112.38V45.0129H122.217V26.6304H146.194V45.0129H156.03Z"
        fill="black"
      />
      <Path
        d="M195.499 27.2454H180.006L187.753 9.66229L195.499 27.2454ZM213.574 45.0129L193.47 1.11719H182.343L162.239 45.0129H172.383L176.686 35.0533H198.818L203.182 45.0129H213.574Z"
        fill="black"
      />
      <Path
        d="M229.253 21.0362V8.67965H240.75C244.07 8.67965 246.457 9.15113 247.913 10.0935C249.367 11.037 250.095 12.5937 250.095 14.766C250.095 16.9383 249.326 18.5256 247.79 19.5302C246.252 20.5354 243.864 21.0362 240.627 21.0362H229.253ZM262.451 45.0135L251.385 26.8154C254.214 25.7088 256.313 24.1723 257.687 22.2045C259.059 20.2368 259.746 17.7781 259.746 14.8271C259.746 5.68777 253.618 1.11719 241.364 1.11719H219.786V45.0129H229.253V28.5981H242.102L251.693 45.0129H262.451V45.0135Z"
        fill="black"
      />
      <Path
        d="M289.929 45.0129V9.29404H307.144V1.11719H262.879V9.29404H280.093V45.0129H289.929Z"
        fill="black"
      />
    </Svg>
  );
};

export const ArrowRightIcon = () => {
  return (
    <Svg
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.47725 13.0486L0.562433 7.13377L0.330078 6.90142L0.562433 6.66906L6.47725 0.754247L6.94196 1.21896L1.5798 6.58112L25.7395 6.58112L25.7395 7.23832L1.59641 7.23832L6.94196 12.5839L6.47725 13.0486Z"
        fill="white"
      />
    </Svg>
  );
};

export const ArrowLeftIcon = () => {
  return (
    <Svg
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.7464 0.754272L25.6612 6.66909L25.8936 6.90144L25.6612 7.1338L19.7464 13.0486L19.2817 12.5839L24.6433 7.22231L0.484093 7.22231V6.56511L24.6278 6.56511L19.2817 1.21898L19.7464 0.754272Z"
        fill="white"
      />
    </Svg>
  );
};

export const ChatIcon = () => {
  return (
    <Svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.75725 15.5056H4.19725V15.2949L4.0331 15.1628L3.75725 15.5056ZM5.0604 19.5236L5.383 19.8228H5.383L5.0604 19.5236ZM7.13417 17.2878L7.26532 16.8678L7.00035 16.7851L6.81158 16.9886L7.13417 17.2878ZM19.9512 9.39937C19.9512 13.7316 15.8017 17.3587 10.5291 17.3587V18.2387C16.1499 18.2387 20.8312 14.3448 20.8312 9.39937H19.9512ZM10.5291 1.44C15.8017 1.44 19.9512 5.06713 19.9512 9.39937H20.8312C20.8312 4.45393 16.1499 0.56 10.5291 0.56V1.44ZM1.10699 9.39937C1.10699 5.06713 5.25653 1.44 10.5291 1.44V0.56C4.9083 0.56 0.226992 4.45393 0.226992 9.39937H1.10699ZM4.0331 15.1628C2.2181 13.7023 1.10699 11.6526 1.10699 9.39937H0.226992C0.226992 11.9574 1.49069 14.2465 3.4814 15.8484L4.0331 15.1628ZM4.19725 19.0123V15.5056H3.31725V19.0123H4.19725ZM4.7378 19.2244C4.54498 19.4323 4.19725 19.2958 4.19725 19.0123H3.31725C3.31725 20.0959 4.64611 20.6173 5.383 19.8228L4.7378 19.2244ZM6.81158 16.9886L4.7378 19.2244L5.383 19.8228L7.45677 17.587L6.81158 16.9886ZM10.5291 17.3587C9.38051 17.3587 8.28124 17.1851 7.26532 16.8678L7.00302 17.7078C8.10404 18.0516 9.29176 18.2387 10.5291 18.2387V17.3587Z"
        fill="black"
      />
    </Svg>
  );
};

export const ArrowUp = () => {
  return (
    <Svg width="18" height="37" viewBox="0 0 18 37" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 8.9708L9.73631 0.707106L9.0292 -3.92126e-07L8.32209 0.707106L0.0583988 8.9708L1.47261 10.385L8.0311 3.82652L8.0311 36.2634L10.0311 36.2634L10.0311 3.83033L16.5858 10.385L18 8.9708Z"
        fill="#E6FF00"
      />
    </Svg>
  );
};

export const ArrowLeftPrimary = () => {
  return (
    <Svg
      width="37"
      height="18"
      viewBox="0 0 37 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.2929 18L35.5566 9.73631L36.2637 9.0292L35.5566 8.32209L27.2929 0.0583984L25.8787 1.47261L32.4371 8.0311L0.000286974 8.0311L0.000286799 10.0311L32.4333 10.0311L25.8787 16.5858L27.2929 18Z"
        fill="#E6FF00"
      />
    </Svg>
  );
};

export const ArrowLeft = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "#0033F7", height = "20", width = "24" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5359 19.084L23.6522 9.96769L24 9.61987L23.6522 9.27205L14.5359 0.155755L13.8403 0.851388L22.119 9.13016L0.972581 9.13016L0.972581 10.1139L22.1147 10.1139L13.8403 18.3884L14.5359 19.084Z"
        fill={color}
      />
    </Svg>
  );
};

export const ArrowRight = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "#0033F7", height = "20", width = "24" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.46411 0.14453L0.347818 9.26083L1.65476e-06 9.60865L0.347818 9.95646L9.46412 19.0728L10.1597 18.3771L1.88097 10.0984L23.0274 10.0983L23.0274 9.11458L1.88533 9.11458L10.1597 0.840162L9.46411 0.14453Z"
        fill={color}
      />
    </Svg>
  );
};
export const ArrowCorner = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.015 11.683V.881H3.212v1h9.098L.544 13.647l.707.707L13.015 2.59v9.093h1z"
        fill="#fff"
      />
    </Svg>
  );
};

export const NotificationIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "black", height = "37", width = "34" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 34 37`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M33.9426 16.9555H0.0562628C0.0865476 7.6238 7.66066 0.0683787 16.9994 0.0683787C26.3382 0.0683787 33.9123 7.6238 33.9426 16.9555Z"
        stroke={color}
        stroke-width="0.112343"
      />
      <Path
        d="M33.9426 25.9433H0.0562628C0.0865476 16.6116 7.66066 9.05617 16.9994 9.05617C26.3382 9.05617 33.9123 16.6116 33.9426 25.9433Z"
        stroke={color}
        stroke-width="0.112343"
      />
      <Path
        d="M33.9483 36.8078H0.0517C0.0795376 27.4712 7.65688 19.911 17 19.911C26.3431 19.911 33.9205 27.4712 33.9483 36.8078Z"
        stroke={color}
        stroke-width="0.103246"
      />
    </Svg>
  );
};
export const SaveStarIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "black", height = "66", width = "64" } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 64 66" fill="none">
      <Path
        d="M35.2289 24.8271L35.2612 25.057L35.4459 24.9164L53.7606 10.9728L40.0112 29.5522L39.8758 29.7352L40.1011 29.7677L62.7811 33.0449L40.1011 36.3221L39.8758 36.3546L40.0112 36.5376L53.7607 55.117L35.4459 41.1735L35.2612 41.0328L35.2289 41.2628L31.9998 64.2527L28.7708 41.2628L28.7385 41.0328L28.5537 41.1735L10.239 55.117L23.9884 36.5376L24.1238 36.3546L23.8985 36.3221L1.21852 33.0449L23.8985 29.7677L24.1238 29.7352L23.9884 29.5522L10.239 10.9728L28.5537 24.9164L28.7385 25.057L28.7708 24.8271L31.9998 1.83713L35.2289 24.8271Z"
        stroke={color}
        stroke-width="0.271991"
      />
    </Svg>
  );
};

export const AboutIcon = (props: {
  color?: string | number;
  height?: string | number;
  width?: string | number;
}) => {
  const { color = "black", height = "81", width = "91" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 91 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.256306 80.85L45.5 0.306278L90.7437 80.85H0.256306Z"
        stroke={color}
        stroke-width="0.3"
      />
    </Svg>
  );
};

export const ReportIcon = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "black", height = "28", width = "121" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 121 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="0.15"
        y="0.241797"
        width="90.2139"
        height="27.2477"
        rx="13.6239"
        stroke={color}
        stroke-width="0.3"
      />
      <Rect
        x="59.1852"
        y="0.241797"
        width="60.6985"
        height="27.2477"
        rx="13.6239"
        stroke={color}
        stroke-width="0.3"
      />
    </Svg>
  );
};
export const TermCondition = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { color = "black", height = "57", width = "59" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 59 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M58.0197 9.93432C58.0197 11.1389 57.2489 12.3126 55.793 13.4031C54.3397 14.4917 52.2273 15.4782 49.6039 16.3093C44.3588 17.971 37.1036 19.001 29.0833 19.001C21.0629 19.001 13.8078 17.971 8.56266 16.3093C5.93924 15.4782 3.8269 14.4917 2.37356 13.4031C0.91764 12.3126 0.146885 11.1389 0.146885 9.93432C0.146885 8.72977 0.91764 7.55602 2.37356 6.46553C3.8269 5.37698 5.93924 4.39044 8.56266 3.55934C13.8078 1.89767 21.0629 0.867588 29.0833 0.867588C37.1036 0.867588 44.3588 1.89767 49.6039 3.55934C52.2273 4.39044 54.3397 5.37698 55.793 6.46553C57.2489 7.55602 58.0197 8.72977 58.0197 9.93432Z"
        stroke={color}
        stroke-width="0.293771"
      />
      <Path
        d="M58.0197 28.3611C58.0197 29.5656 57.2489 30.7394 55.793 31.8299C54.3397 32.9184 52.2273 33.905 49.6039 34.7361C44.3588 36.3977 37.1036 37.4278 29.0833 37.4278C21.0629 37.4278 13.8078 36.3977 8.56266 34.7361C5.93924 33.905 3.8269 32.9184 2.37356 31.8299C0.91764 30.7394 0.146885 29.5656 0.146885 28.3611C0.146885 27.1565 0.91764 25.9828 2.37356 24.8923C3.8269 23.8037 5.93924 22.8172 8.56266 21.9861C13.8078 20.3244 21.0629 19.2943 29.0833 19.2943C37.1036 19.2943 44.3588 20.3244 49.6039 21.9861C52.2273 22.8172 54.3397 23.8037 55.793 24.8923C57.2489 25.9828 58.0197 27.1565 58.0197 28.3611Z"
        stroke={color}
        stroke-width="0.293771"
      />
      <Path
        d="M58.0197 46.7898C58.0197 47.9943 57.2489 49.1681 55.793 50.2586C54.3397 51.3471 52.2273 52.3337 49.6039 53.1648C44.3588 54.8264 37.1036 55.8565 29.0833 55.8565C21.0629 55.8565 13.8078 54.8264 8.56266 53.1648C5.93924 52.3337 3.8269 51.3471 2.37356 50.2586C0.91764 49.1681 0.146885 47.9943 0.146885 46.7898C0.146885 45.5852 0.91764 44.4115 2.37356 43.321C3.8269 42.2324 5.93924 41.2459 8.56266 40.4148C13.8078 38.7531 21.0629 37.7231 29.0833 37.7231C37.1036 37.7231 44.3588 38.7531 49.6039 40.4148C52.2273 41.2459 54.3397 42.2324 55.793 43.321C57.2489 44.4115 58.0197 45.5852 58.0197 46.7898Z"
        stroke={color}
        stroke-width="0.293771"
      />
    </Svg>
  );
};

export const ChangePhoneNumber = (props: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  const { height = "37", width = "34" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.2745 9.66308L24.6314 0.306152L24.817 0.491706L15.684 9.62465H28.1715C39.1233 9.62465 48.0015 18.5029 48.0015 29.4547H47.7391C47.7391 18.6478 38.9784 9.88707 28.1715 9.88707H15.684L24.817 19.02L24.6314 19.2056L15.2745 9.84864L15.1817 9.75586L15.2745 9.66308ZM32.727 39.3171L23.3701 48.6741L23.1845 48.4885L32.3175 39.3556H19.83C8.8782 39.3556 0 30.4774 0 19.5256H0.262413C0.262413 30.3324 9.02313 39.0931 19.83 39.0931H32.3175L23.1845 29.9602L23.3701 29.7746L32.727 39.1316L32.8198 39.2244L32.727 39.3171Z"
        fill="black"
      />
    </Svg>
  );
};

export const ReferFriendIcon = (props: {
  color?: string;
  height?: number;
  width?: number;
}) => {
  const { color = "black", height = "37", width = "34" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 37 34`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.6407 29.5888C26.6842 29.5888 34.5069 25.3791 34.5069 20.1362C34.5069 14.8928 25.798 10.2402 16.1238 10.2402C6.44907 10.2402 1 12.8991 1 15.4099C1 17.9207 6.59717 20.1362 16.1238 20.1362C25.6505 20.1362 34.5069 16.148 34.5069 10.6098C34.5069 5.07079 24.967 1 16.382 1"
        stroke={color}
        stroke-width="0.200748"
        stroke-miterlimit="10"
      />
      <Path
        d="M20.6046 32.2462L16.543 29.5878L20.6046 27.0332"
        stroke={color}
        stroke-width="0.200748"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export const StartIcon = (props: {
  color?: string;
  height?: number;
  width?: number;
}) => {
  const { color = "black", height = "18", width = "18" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.9768 1.50617C9.02457 1.3397 9.26047 1.3397 9.30825 1.50617L10.8098 6.73842C10.8317 6.81447 10.9025 6.86591 10.9815 6.86317L16.4217 6.67441C16.5948 6.6684 16.6677 6.89275 16.5241 6.98963L12.012 10.0346C11.9464 10.0788 11.9194 10.1621 11.9464 10.2364L13.807 15.352C13.8662 15.5148 13.6754 15.6534 13.5389 15.5468L9.24864 12.1965C9.18628 12.1478 9.09877 12.1478 9.0364 12.1965L4.74616 15.5468C4.60966 15.6534 4.41881 15.5148 4.47801 15.352L6.33864 10.2364C6.36569 10.1621 6.33865 10.0788 6.27306 10.0346L1.76091 6.98963C1.61735 6.89275 1.69025 6.6684 1.86333 6.67441L7.30351 6.86317C7.38259 6.86591 7.45339 6.81447 7.47521 6.73842L8.9768 1.50617Z"
        stroke={color}
      />
    </Svg>
  );
};

export const StartHeadingIcon = (props: {
  color?: string;
  height?: number;
  width?: number;
}) => {
  const { color = "black", height = "47", width = "50" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M24.1349 1.37687C24.3843 0.507891 25.6157 0.50789 25.8651 1.37687L30.4488 17.3486C30.588 17.8338 31.0397 18.162 31.5442 18.1445L48.1507 17.5683C49.0542 17.5369 49.4347 18.7081 48.6853 19.2138L34.9117 28.5086C34.4933 28.791 34.3207 29.322 34.4933 29.7964L40.173 45.412C40.482 46.2617 39.4858 46.9854 38.7733 46.429L25.677 36.2018C25.2792 35.8911 24.7208 35.8911 24.323 36.2018L11.2268 46.429C10.5142 46.9854 9.51801 46.2617 9.82702 45.412L15.5067 29.7964C15.6792 29.322 15.5067 28.791 15.0883 28.5086L1.31469 19.2138C0.565302 18.7081 0.945823 17.5369 1.84933 17.5683L18.4558 18.1445C18.9603 18.162 19.412 17.8338 19.5512 17.3486L24.1349 1.37687Z"
        stroke={color}
        stroke-width="0.2"
      />
    </Svg>
  );
};
