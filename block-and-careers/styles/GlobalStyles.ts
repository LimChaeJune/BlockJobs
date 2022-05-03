import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    :focus {
      outline: none;
      border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: 'Noto Sans', sans-serif;
      font-family: 'Noto Sans KR', sans-serif;
      font-size:14px;
      color:white;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

`;

export default GlobalStyles;
