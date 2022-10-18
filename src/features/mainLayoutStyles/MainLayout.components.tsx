import styled from "styled-components";

export const MainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 390px) {
    //font-size: 18px;
  }
  @media (min-width: 650px) {
    //font-size: 1.125rem; /* 18px */
    //line-height: 1.75rem; /* 28px */
  }
  @media (min-width: 1280px) {
    display: grid;
    height:100vh;
    max-width: 1440px;
    margin: 0 auto;
    grid-template-rows: [header-start] 145px  [content-start] 1fr [footer-start] 60px;
    grid-template-columns: [menu] 300px [main] 1fr;
    grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    justify-content: space-around;
  }
  
  
`
export const NavBar = styled.header`
  grid-area: header;
  padding: 1.5rem;
  align-self: center;
  max-width: 1280px;
  width: 100%;
`;
export const Main = styled.main`
 //background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
  margin-bottom: 8rem;
`;
export const SideBar = styled.menu`
  grid-area: sidebar;
  padding: 0.25rem;
  
`;
export const FooterBar = styled.footer`
  grid-area: footer;
  padding: 0.25rem;
  align-self: center;
`

