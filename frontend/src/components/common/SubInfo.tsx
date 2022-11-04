import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import palette from '@styles/palette';

interface Props {
  username: string;
  publishedDate: string;
  hasMarginTop?: boolean;
}

const SubInfo = ({ username, publishedDate, hasMarginTop = false }: Props) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;

const SubInfoBlock = styled.div<{ hasMarginTop: boolean }>`
  margin-top: ${(props) => (props.hasMarginTop ? '1rem' : '')};
  color: ${palette.gray[6]};

  span + span:before {
    content: '\\B7';
    padding: 0 0.25rem;
    color: ${palette.gray[5]};
  }
`;
