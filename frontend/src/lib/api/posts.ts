import client from './client';

interface Post {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: string;
  user: {
    _id: string;
    username: string;
  };
}

type WritePostRequest = Omit<Post, '_id' | 'publishedDate' | 'user'>;

const posts = {
  writePost: ({ title, body, tags }: WritePostRequest) => {
    return client.post<Post>('/api/posts', { title, body, tags });
  },
};

export default posts;
