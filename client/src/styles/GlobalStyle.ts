import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}

    /* font */
    // pretendard - 400(Regular) 500(Medium) 600(SemiBold) 700(Bold)
    @font-face {
        font-family: 'yg-jalnan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    :root{
        --color-primary: #F8CF84;
        --color-secondary: #F2AE1C;
        --color-point: #4C7031;
        --color-point-hover: #7AB152;
        --color-light-gray: #C8C8C8; 
        --color-dark-gray: #616161;
        --color-danger: #C50000;
        --color-black: #333333;
        --color-white: #FFFFFF;
    }

    *{
        box-sizing: border-box;
    }

    html{
        font-size: 62.5%;
    }

    body{
        color: var(--color-black);
        font-family: 'Pretendard', sans-serif;
        font-size: 1.6rem;
    }

    h1,h2,h3,h4,h5,h6{
        font-family: 'yg-jalnan', sans-serif;
    }

    ol,ul,li{
        list-style: none;
    }

    a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        display: block;
    }
    
    input, button{
        outline: none;
    }

    button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        color:inherit
    }

    span {
        color: inherit;
    }

    // icon setting
    .material-icons-round {
        font-size: inherit;
        display: block;
        color: inherit;
    }

    @media ${({ theme }) => theme.device.mobile} {
        body {
            font-size: 1.4rem;
        }
    }
`

export default GlobalStyle
