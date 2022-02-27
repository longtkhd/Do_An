import styled from 'styled-components';

export const InputAreaWrapper = styled.div<{ height: number }>`
  ${({ theme }) =>
    theme.mixins.boxShadow('rgba(130, 129, 129, 0.12) 0px -3px 7px 1px')};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  height: ${({ height }) => height + 'px'};
`;

export const InputTextarea = styled.textarea`
  padding: 5px 10px 0 10px;
  font-size: 14px;
  line-height: 24px;
  border: none;
  resize: none;
  height: 50px;
  width: calc(100% - 20px);
  &:focus {
    outline: none;
  }
`;

export const InputIconWrapper = styled.div`
  height: 30px;
  padding: 0 10px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.justifyContent('space-between')};
`;

export const IconWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
`;

export const IconButton = styled.label`
  background: ${({ theme }) => theme.colors.primaryColor};
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.whiteColor};
  border-radius: 50%;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  margin-right: 5px;
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryColorLighten};
  }
`;

export const IconButtonSend = styled(IconButton)`
  margin-right: 0;
  width: 40px;
  height: 40px;
`;

export const EmojiWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  right: calc(60% + 30px);
  bottom: 110px;
  .emoji-dialog {
    .emoji-row {
      ${({ theme }) => theme.mixins.flexDisPlay('flex')};
      ${({ theme }) => theme.mixins.justifyContent('space-around')};
      .emoji {
        padding: 0;
      }
    }
  }
  .emojione {
    cursor: pointer;
    width: 22px;
    height: 22px;
  }
`;

export const InputFileWrapper = styled.div`
  height: 56px;
  padding: 3px 10px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row')};
`;

export const FileWrapper = styled.div`
  border: 1.5px solid #d1d1d1;
  margin-right: 10px;
  border-radius: 10px;
  min-width: 120px;
  max-width: 200px;
  padding: 5px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  position: relative;
  ${({ theme }) => theme.mixins.transition('0.2s all')};
  &:hover {
    border: 1.5px solid ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const FileIconWrapper = styled.div`
  width: 30px;
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  color: #999999;
  cursor: pointer;
  ${({ theme }) => theme.mixins.transition('0.15s all')};
  &:hover {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const FileNameSizeWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  margin: 0 10px;
  width: calc(100% - 60px);
`;

export const FileName = styled.div`
  width: 100%;
  font-weight: 600;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const FileSize = styled.div`
  font-size: 12px;
`;
