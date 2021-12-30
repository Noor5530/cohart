import { Posts, YourConnections } from '../types';

export interface GetAllPostResponse {
  type: string;
  response: Posts[];
}
export interface GetYourConnectionsResponse {
  type: string;
  response: YourConnections[];
}
export interface GetAllPostRequest {
  type: string;
}
export interface GetSuggestedConnectionResponse {
  type: string;
  response: YourConnections[];
}
export interface GetSuggestedConnectionCategoriesResponse {
  type: string;
  response: YourConnections[];
}
export interface GetPendingRequestResponse {
  type: string;
  response: YourConnections[];
}
