import Responsive from '@components/common/Responsive';
import Editor from '@components/write/Editor';
import TagBox from '@components/write/TagBox';
import React from 'react';

const WritePage = () => {
  return (
    <Responsive>
      <Editor />
      <TagBox />
    </Responsive>
  );
};

export default WritePage;
