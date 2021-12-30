import { IAppState } from './app';
import { ILoading } from './loading';
import { SnackBar } from './snackBar';
import { IThemeState } from './theme';
import { UserState } from './user';

export default interface AppState {
  app: IAppState;
  loading: ILoading;
  user: UserState;
  theme: IThemeState;
  snackBar: SnackBar;
}
