import client from './client';
import queryString from 'query-string';

export interface Post {
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

interface ReadPostsRequest {
  page?: string | (string | null)[] | null;
  username?: string | (string | null)[] | null;
  tag?: string | (string | null)[] | null;
}

interface WritePostRequest
  extends Omit<Post, '_id' | 'publishedDate' | 'user'> {}

interface UpdatePostRequest extends Omit<Post, 'publishedDate' | 'user'> {}

const posts = {
  readPosts: ({ page, username, tag }: ReadPostsRequest) => {
    const query = queryString.stringify({ page, username, tag });
    return client.get<Post[]>(`/api/posts?${query}`);
  },
  readPost: (id: string) => {
    return client.get<Post>(`/api/posts/${id}`);
  },
  writePost: ({ title, body, tags }: WritePostRequest) => {
    return client.post<Post>('/api/posts', { title, body, tags });
  },
  updatePost: ({ _id, title, body, tags }: UpdatePostRequest) => {
    return client.patch<Post>(`/api/posts/${_id}`, { title, body, tags });
  },
  removePost: (id: string) => {
    return client.delete(`/api/posts/${id}`);
  },
};

export default posts;
