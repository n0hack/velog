import React from 'react';
import styled from '@emotion/styled';
import queryString from 'query-string';
import { Button } from '@components/common';

interface Props {
  username: string;
  tag: string;
  page: number;
  lastPage: number;
}

const buildLink = ({
  username,
  tag,
  page,
}: {
  username?: string;
  tag?: string;
  page: number;
}) => {
  const query = queryString.stringify({ tag, page, username });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ username, tag, page, lastPage }: Props) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;

const PaginationBlock = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

const PageNumber = styled.div``;
