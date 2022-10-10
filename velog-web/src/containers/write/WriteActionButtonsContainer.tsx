import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { writeFormState } from '@modules/write';
import { writePost } from '@lib/api/posts';
import useAsync from '@lib/hooks/useAsync';
import WriteActionButtons from '@components/write/WriteActionButtons';

const WriteActionButtonsContainer = () => {
  const form = useRecoilValue(writeFormState);
  const {
    data: post,
    error,
    requestApi: write,
  } = useAsync(() => writePost({ ...form }), [], true);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  const onPublish = () => {
    console.log('ㅋㅋ');
    write();
  };

  useEffect(() => {
    if (post) {
      const {
        _id,
        user: { username },
      } = post;
      navigate(`/@${username}/${_id}`);
    }

    if (error) {
      console.log(error);
    }
  }, [error, navigate, post]);

  return <WriteActionButtons onCancel={onCancel} onPublish={onPublish} />;
};

export default WriteActionButtonsContainer;
