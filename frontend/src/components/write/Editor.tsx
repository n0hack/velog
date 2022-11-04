import { Responsive } from '@components/common';
import styled from '@emotion/styled';
import palette from '@styles/palette';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface Props {
  title: string;
  body: string;
  onChangeField: (payload: {
    key: 'title' | 'body' | 'tags';
    value: string | string[];
  }) => void;
}

const Editor = ({ title, body, onChangeField }: Props) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeBody = (html: string) => {
    onChangeField({ key: 'body', value: html });
  };

  return (
    <EditorBlock>
      <TitleInput
        name="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={onChangeTitle}
      />
      <QuillWrapper>
        <ReactQuill
          theme="bubble"
          placeholder="내용을 작성하세요..."
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['blockquote', 'code-block', 'link', 'image'],
            ],
          }}
          value={body}
          onChange={onChangeBody}
        />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;

const EditorBlock = styled(Responsive)`
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 3rem;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
`;

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 320px;
    padding: 0;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;
