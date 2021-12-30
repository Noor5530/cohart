export interface Post {
  id: string;
  mediaUrl: string;
  artist: Artist;
  caption: string;
  interests: string[];
}

export interface Artist {
  id: string;
  name: string;
  cover_image: string;
  subtitle: string;
  location: string;
  interests: string[];
}

interface MyProfileStore {
  artist: Artist;
  badge: string;
  contactInfo: string;
  meet_me_at: string[];
  last_spotted: string;
  currently: string;
  affiliations: string[];
  posts: Post[];
}
