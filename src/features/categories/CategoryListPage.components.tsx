import styled from "styled-components";

export const MainBox = styled.div`
 display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    //animation-name: example;
    //animation-duration: 10s;
    //animation-fill-mode: forwards;
    //animation-timing-function: ease-in;
    //@keyframes example {
    //  0%   {display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
    //  //25%  {background-color: yellow;}
    //  //50%  {background-color: blue;}
    //  //75%  { }
    //  100% {display: grid;
    //    grid-template-columns: repeat(1, minmax(0, 1fr)); width:30%;}
    //  
    //}
  }
`
