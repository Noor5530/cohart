import { ViewStyle } from "react-native";
import { UserState } from "models/reducers/user";
import { PortFolio } from "services/fetchUserWork";
import { Post } from "services/getUserPost";
export interface TabBarProps {
  tab?: string;
  tabs?: string[];
  style?: ViewStyle;
  onChangeTab?: (index: number) => void;
  index?: number;
  onPressTab?: (index: number) => void;
  testID?: string
}
export interface TabProps {
  tab: string;
  index: number;
  selectedTabIndex: number;
  onPressTab: (index: number) => void;
  testID?: string
}
export interface EmptyComponentProps {
  heading: string;
  description: string;
  style?: ViewStyle;
}

export interface profileHeaderProps extends Partial<UserState> {}

export interface TagProps {
  data?: string[];
}

export interface SnapshotProps {
  item: Post;
  index: number;
}

export interface PortFolioProps {
  item: PortFolio;
  index: number;
}

export interface AboutProps extends Partial<UserState> {
  currentUser?: boolean;
}