import styled from "styled-components";

export const MainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1280px) {
    display: grid;
    height:100vh;
    max-width: 1440px;
    margin: 0 auto;
    grid-template-rows: [header-start] 145px [section-start] 100px  [content-start] 1fr [footer-start] 60px;
    grid-template-columns: [menu] 300px [main] 1fr;
    grid-template-areas:
    "header header"
    "section section"
    "sidebar main"
    "footer footer";
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    justify-content: space-around;
  }
`
export const Header = styled.header`
  grid-area: header;
  padding: 1.5rem;
  align-self: center;
  //max-width: 1280px;
  width: 100%;
`;
export const Section = styled.section`
  grid-area: section;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  display: block;
  width: 100%;
  align-self: center;
  //@media (max-width: 955px) {
  //  width: 70%;
  //}
`;
export const Main = styled.main`
  color: white;
  grid-area: main;
  padding: 0.25rem;
  margin-bottom: 12rem;
  @media(min-width:1280px){
    margin-bottom: 8rem;
  }
  
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
export const SinglePageTitle = styled.h1`
   font-size: 1.125rem; /* 24px */
   line-height: 1.175rem; /* 32px */
   padding: 0.5rem 1.5rem;
   text-align: center;
   color: #737373;
   font-weight: bold;
   margin-bottom: 1rem;
   text-transform: capitalize;
   @media (min-width: 450px) {
     font-size: 1.25rem; /* 30px */
     line-height: 1.75rem; /* 36px */

   }
   @media (min-width: 650px) {
     font-size: 1.5rem; /* 36px */
     line-height: 2rem; /* 40px */
   }
   @media (min-width: 960px) {
     font-size: 1.5rem; /* 48px */
     line-height: 2rem;
   }      
  ;
    
`
