import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: #FFF;
    color: #000000DE;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button, textarea {
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }
`;
