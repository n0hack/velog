import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import 'react-quill/dist/quill.bubble.css';

interface Props {
  title: string;
  body: string;
  onChange: (payload: { key: 'title' | 'body'; value: string }) => void;
}

const Editor = ({ title, body, onChange }: Props) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ key: 'title', value: e.target.value });
  };

  const onChangeBody = (html: string) => {
    onChange({ key: 'body', value: html });
  };

  return (
    <StyledEditor>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={onChangeTitle}
      />
      <QuillWrapper>
        <ReactQuill
          placeholder="내용을 입력하세요"
          theme="bubble"
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
    </StyledEditor>
  );
};

export default Editor;

const StyledEditor = styled.div`
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 3rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  outline: 0;
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
