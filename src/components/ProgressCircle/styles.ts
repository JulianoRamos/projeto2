import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg) }
`;

export const Container = styled.div`
  position: fixed;
  top: 40%;
  left: 46%;

  height: 120px;
  width: 120px;

  border: 5.5px solid #eaeaea;
  border-left-color: #cf043b;
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;
