export interface Posts {
  _id: number | string;
  phone_number?: number | string;
  created_at?: number | string;
  updated_at?: number | string;
  title: string;
  description: string;
  tags: string[];
  post_image?: string;
  post_file: string;
  created_by: Object;
  mediaUrl: string;
  post_type: string;
  user_id?: string;
  is_featured: boolean;
}
export interface YourConnections {
  _id: number | string;
  name: string;
}
export interface User {
  _id: string;
  phone_number: number | string;
  first_name: string;
  last_name: string;
  full_name: string;
  location: string;
  state: string;
  country: string;
  interests: string;
  title_stamp: number;
  bio: string;
  meet_me_at: string[];
  last_spotted: string;
  currently: string;
  affiliations: string;
}

export interface Response<Type> {
  data: {
    statusCode: number;
    data: Type;
  };
}
