import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import palette from '@styles/palette';

interface Props {
  tags: string[];
}

const Tags = ({ tags }: Props) => {
  return (
    <TagsBlock>
      {tags.map((tag) => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;

const TagsBlock = styled.div`
  margin-top: 0.5rem;

  .tag {
    display: inline-block;
    margin-right: 0.5rem;
    color: ${palette.cyan[7]};
    text-decoration: none;

    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;
