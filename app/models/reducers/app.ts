import { Posts, YourConnections } from 'models/types';

export interface IAppState {
  posts: Posts[];
  userPost: Posts[];
  yourConnections: YourConnections[];
  suggestedConnections: YourConnections[];
  suggestedConnectionsCategories: YourConnections[];
  portfolio: any[];
  pendingRequest: YourConnections[];
  groupFriends: YourConnections[];
  friendsGroup: any[];
  savedWork: any[];
  live_data: any;
  processingDeeplink: boolean;
}
