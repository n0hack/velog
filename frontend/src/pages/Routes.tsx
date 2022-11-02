import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import EmptyPage from './EmptyPage';
import LoginPage from './LoginPage';
import PostListPage from './PostListPage';
import PostPage from './PostPage';
import RegisterPage from './RegisterPage';
import WritePage from './WritePage';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/@:username" element={<PostListPage />} />
      <Route path="/@:username/:postId" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="*" element={<EmptyPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
