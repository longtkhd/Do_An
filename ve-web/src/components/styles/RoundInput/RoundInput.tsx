import styled from 'styled-components';
import { Input } from 'antd';

const sizeBoders = {
  large: '40px',
  middle: '32px',
  small: '24px',
};

const RoundInput = styled(Input)<{ size: string }>`
  border-radius: ${({ size }) => sizeBoders[size]};
`;

export default RoundInput;
