import styled from 'styled-components';

export const Image = styled.img`
  max-width: 150px;
  max-height: 150px;
  ${({ theme }) => theme.mixins.borderRadius('12px')};
  float: left;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

export const BlockWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexDisPlay(null, 'column')};
  ${({ theme }) => theme.mixins.alignItems('flex-start')};
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const ActionWrapper = styled.div`
  float: left;
  margin-left: 5px;
  width: 30px;
  height: auto;
`;
