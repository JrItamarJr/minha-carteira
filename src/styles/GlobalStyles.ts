import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
/* body{

    width: 100%;
    height: 100vh;
    background-color: red;
}
    
h1{
    color: white;
} */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body, #root {
height: 100%;
}

*, button, input {

    border:0;
    outline: 0;
    font-family: 'Century Gothic', 'Roboto', sans-serif;

}

button {
    cursor: pointer;
    
}

`;