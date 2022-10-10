import React from 'react';
import { useRecoilState } from 'recoil';
import { writeFormState } from '@modules/write';
import TagBox from '@components/write/TagBox';

const TagBoxContainer = () => {
  const [{ tags }, setForm] = useRecoilState(writeFormState);

  const onChangeTags = (nextTags: string[]) => {
    setForm((form) => ({ ...form, tags: nextTags }));
  };

  return <TagBox tags={tags} onChangeTags={onChangeTags} />;
};

export default TagBoxContainer;
