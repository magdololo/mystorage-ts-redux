import styled from "styled-components";

export const MainBox = styled.div`
 display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  @media (min-width: 750px) {
    gap: 1rem; 
    margin: 0 3rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
;
`
