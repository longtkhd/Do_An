import styled from 'styled-components';

export const MessageSentWrapper = styled.div`
  min-height: fit-content;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row')};
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  ${({ theme }) => theme.mixins.justifyContent('flex-end')};
  margin: 3px 0;
  padding: 0px 10px;
  width: 100%;
`;

export const MessageSentContent = styled.div`
  max-width: calc(100% - 60px);
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  ${({ theme }) => theme.mixins.alignItems('flex-end')};
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
`;

export const MessageContentWrapper = styled.div`
  ${({ theme }) =>
    theme.mixins.boxShadow(
      '15px 15px 35px rgba(112, 124, 151, 0.05), 10px 10px 25px rgba(112, 124, 151, 0.05)'
    )};
  border: 1px solid rgba(112, 124, 151, 0.25);
  border-radius: 10px 4px 10px 10px;
  color: #000000;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  word-break: break-word;
`;

export const MessageContentText = styled.div`
  white-space: break-spaces;
  font-size: 100%;
  margin-bottom: 0;
  overflow-y: hidden;
`;

export const MessageContentTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const MessageImage = styled.img`
  max-width: 100%;
  max-height: 350px;
`;

export const MessageVideo = styled.video`
  max-width: 100%;
  max-height: 350px;
`;

export const MessageFile = styled.div`
  min-width: 120px;
  max-width: 200px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  height: fit-content;
  width: fit-content;
  position: relative;
  transition: 0.2s all;
  ${({ theme }) => theme.mixins.alignItems('center')};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.violetRed};
  }
`;

export const FileImage = styled.div`
  width: 40px;
`;

export const FilenameWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  margin: 0 10px;
  width: calc(100% - 80px);
`;

export const Filename = styled.div`
  width: 100%;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1;
`;

export const Filesize = styled.div`
  font-size: 12px;
`;
