import client from './client';

interface WritePostRequest {
  title: string;
  body: string;
  tags: string[];
}

interface WritePostResponse extends WritePostRequest {
  user: {
    _id: string;
    username: string;
  };
  _id: string;
  publishedDate: string;
}

export const writePost = ({ title, body, tags }: WritePostRequest) => {
  return client.post<WritePostResponse>('/api/posts', { title, body, tags });
};
