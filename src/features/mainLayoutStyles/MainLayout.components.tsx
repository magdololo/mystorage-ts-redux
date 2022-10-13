import styled from "styled-components";

export const MainPageLayout = styled.div`
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
  
`
export const NavBar = styled.header`
  grid-area: header;
  padding: 0.25rem;
  align-self: center;
`;
export const Main = styled.main`
 //background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;
export const SideBar = styled.menu`
  grid-area: sidebar;
  padding: 0.25rem;
  
`;
export const FooterBar = styled.footer`
  grid-area: footer;
  padding: 0.25rem;
  background-color: antiquewhite;
  align-self: center;
`

