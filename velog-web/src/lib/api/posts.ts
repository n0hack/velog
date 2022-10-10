import client from './client';

export interface Post {
  title: string;
  body: string;
  tags: string[];
  user: {
    _id: string;
    username: string;
  };
  _id: string;
  publishedDate: string;
}

interface WritePostRequest
  extends Omit<Post, 'user' | '_id' | 'publishedDate'> {}

interface WritePostResponse extends Post {}

interface ReadPostResponse extends Post {}

export const writePost = ({ title, body, tags }: WritePostRequest) => {
  return client.post<WritePostResponse>('/api/posts', { title, body, tags });
};

export const readPost = (id: string) => {
  return client.get<ReadPostResponse>(`/api/posts/${id}`);
};
