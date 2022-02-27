import styled from 'styled-components';
import { Input } from 'antd';

const sizeBoders = {
  large: '40px',
  middle: '32px',
  small: '24px',
};

const RoundInputPassword = styled(Input.Password)<{ size: string }>`
  border-radius: ${({ size }) => sizeBoders[size]};
`;

export default RoundInputPassword;
