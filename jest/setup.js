jest.mock("react-native/Libraries/Linking/Linking", () => {
  return {
    openURL: jest.fn(),
  };
});
jest.mock("react-native/Libraries/Interaction/InteractionManager", () => {
  return {
    runAfterInteractions: jest.fn(),
  };
});
jest.mock("react-native-collapsible/Accordion", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("rn-fetch-blob", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("rn-qr-generator", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("react-native-paper/src/components/ActivityIndicator", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("@react-navigation/native", () => {
  return {
    useIsFocused: () => true,
    useNavigation: () => {
      return {
        navigate: jest.fn(),
        setOptions: jest.fn(),
        goBack: jest.fn()
      };
    },
    useDispatch: jest.fn(),
    useRoute: jest.fn().mockReturnValue({
      params: { currentUser: false, user: null },
    }),
  };
});
jest.mock("@react-navigation/core", () => {
  return {
    useIsFocused: () => true,
    useNavigation: () => {
      return {
        navigate: jest.fn(),
      };
    },
    useDispatch: jest.fn(),
    useRoute: jest.fn().mockReturnValue({
      params: { currentUser: false, user: null },
    }),
  };
});
jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
    useSelector: jest
      .fn()
      .mockImplementation((func) => func({ user: { _id: 111 } })),
  };
});

jest.mock("react-native-branch", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: {
      subscribe: jest.fn(),
      createBranchUniversalObject: jest.fn(),
    },
  };
});

jest.mock("react-hook-form", () => {
  return {
    useForm: jest.fn().mockReturnValue({
      control: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: jest.fn(),
      },
    }),
    useFormContext : jest.fn().mockReturnValue({
      control: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: jest.fn(),
      },
    }),
    Controller: ({ children }) => children,
  };
});

jest.mock("react-native-paper", () => {
  return {
    ActivityIndicator: jest.fn()
  };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: ({ children }) => children,
  };
});
jest.mock("react-native-gesture-handler", () => {});
jest.mock("react-native-device-info", () => {
  return {
    getVersion: jest.fn(),
    getBuildNumber: jest.fn(),
  };
});
jest.mock("@segment/analytics-react-native", () => ({
  setup: () => null,
  identify: () => null,
  reset: () => null,
}));

jest.mock("../app/components/workAround", () => {
  return {
    Container: ({ children }) => {
      return children;
    },
  };
});
jest.mock("react-native-paper/src/components/Button", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("react-native-paper/src/components/ActivityIndicator", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-version-check", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: {
      getLatestVersion: jest.fn(),
      getCurrentVersion: jest.fn(),
    },
  };
});

jest.mock("react-native-paper/src/components/Snackbar", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("reanimated-bottom-sheet", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter", () => {
  const { EventEmitter } = require("events");
  return EventEmitter;
});
jest.mock("react-native-device-info", () => {});

jest.mock("react-native-country-picker-modal", () => {
  return {
    CountryModalProvider: ({ children }) => {
      return children;
    },
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: () =>
      jest.mockReturnValue(Promise.resolve({ mime: "", data: "" })),
      __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: {
      openPicker: () => Promise.resolve({ path: 'dummy_image' })
    },
  };
});

jest.mock("react-native-jw-media-player", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-linear-gradient", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-modal", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-vector-icons/Entypo", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-vector-icons/Ionicons", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("@react-native-community/async-storage", () => {
  return {
    getItem: () => Promise,
    setItem: () => jest.fn(),
    removeItem: () => jest.fn,
  };
});
jest.mock("../app/services/client.ts", () => ({
  __esModule: true,
  default: {
    apiClient: {
      interceptors: {
        request: { use: jest.fn(() => {}) },
        response: { use: jest.fn(() => {}) },
      },
    },
  },
}));

jest.mock("rn-fetch-blob", () => {
  return {
    fetch: jest.fn(),
    wrap: jest.fn(),
  };
});

jest.mock("../app/services/client", () => {
  return {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
});

jest.mock("react-native-responsive-screen", () => {
  return {
    widthPercentageToDP: jest.fn(),
    heightPercentageToDP: jest.fn(),
    listenOrientationChange: jest.fn(),
    removeOrientationListener: jest.fn(),
  };
});
jest.mock("react-native-config", () => {
  return {
    BUILD: jest.fn(),
  };
});

jest.mock("react-native-iphone-x-helper", () => {});
jest.mock("react-native-paper", () => {
  return {

  }
});

jest.mock("react-native-permissions", () => {
  return {
    openSettings: jest.fn(),
    check: () => Promise.resolve("limited"),
    PERMISSIONS: {
      IOS: {
        PHOTO_LIBRARY: "PHOTO_LIBRARY",
      },
    },
  };
});

jest.mock("react-native-paper", () => {
  return {
    TextInput: jest.fn(),
  };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: ({ children }) => children,
  };
});
jest.mock("react-native-gesture-handler", () => {
  return {
    FlatList: ({ children }) => children,
    ScrollView: ({ children }) => children,
    TouchableOpacity: ({ children }) => children,
  };
});
jest.mock("react-native-device-info", () => {
  return {
    getVersion: jest.fn(),
    getBuildNumber: jest.fn(),
  };
});
jest.mock("@segment/analytics-react-native", () => ({
  setup: () => null,
  identify: () => null,
  reset: () => null,
  track: () => jest.fn(),
}));

jest.mock("../app/components/workAround", () => {
  return {
    Container: ({ children }) => {
      return children;
    },
  };
});

jest.setTimeout(30000);

jest.mock("reanimated-bottom-sheet", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("react-native-reanimated", () => {
  const View = require("react-native").View;
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    sub: jest.fn(),
    multiply: jest.fn(),
    sqrt: jest.fn(),
    max: jest.fn(),
    diff: jest.fn(),
    onChange: jest.fn(),
    View: View,
    Extrapolate: { CLAMP: jest.fn() },
    Clock: jest.fn(),
    greaterThan: jest.fn(),
    lessThan: jest.fn(),
    startClock: jest.fn(),
    stopClock: jest.fn(),
    clockRunning: jest.fn(),
    not: jest.fn(),
    or: jest.fn(),
    and: jest.fn(),
    spring: jest.fn(),
    decay: jest.fn(),
    defined: jest.fn(),
    call: jest.fn(),
    block: jest.fn(),
    abs: jest.fn(),
    greaterOrEq: jest.fn(),
    lessOrEq: jest.fn(),
    debug: jest.fn(),
    Transition: {
      Together: "Together",
      Out: "Out",
      In: "In",
    },
  };
});
jest.mock("react-native-vector-icons/AntDesign", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("react-native-vector-icons/Fontisto", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-jw-media-player", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-linear-gradient", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-modal", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-vector-icons/Entypo", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("react-native-vector-icons/Ionicons", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});
jest.mock("../app/services/getDeepLinkPost.ts", () => {
  return {
    apiClient: {
      post: () => Promise.resolve({ data: { statusCode: 200 } }),
      get: () => Promise.resolve({ data: { statusCode: 200 } }),
    },
  };
});
jest.mock("react-native-render-html", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

jest.mock("rn-qr-generator", () => {
  return {
    generate: () => Promise.resolve({ uri: "" }),
  };
});

jest.mock("../app/services/client.ts", () => {
  return {
    apiClient: {
      post: () => Promise.resolve({ data: { statusCode: 200 } }),
      get: () => Promise.resolve({ data: { statusCode: 200 } }),
    },
  };
});
jest.mock("../app/screens/ProfileScreen/components/TopBar", () => {
  return {
    default: "mockedDefaultExport",
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    Tab: () => "Tab",
  };
});
jest.mock("../app/components/PrimaryButton", () => {
  return {
    default: "mockedDefaultExport",
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
  };
});
jest.mock("../app/components/Alert", () => {
  return {
    default: "mockedDefaultExport",
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
  };
});

jest.mock("../app/components/ReportBottomSheet", () => {
  return {
    default: "mockedDefaultExport",
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
  };
});
