import styled from 'styled-components';

export const UserPopover = styled.ul`
  margin: -12px -16px;
  padding: 7px 0;
  list-style: none;
  & li {
    cursor: pointer;
    padding: 3px 15px;
    width: 150px;
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.grey2};
    }
    @media screen and (max-width: ${({ theme }) =>
        theme.mediaQueries.sm - 1}px) {
      width: 100%;
    }
  }
`;
