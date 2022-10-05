import styled from "styled-components";


export const BoxMain= styled.div`
  width: 100%;
  background-color: white;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
`
export const Nav = styled.nav`
  max-width: 1280px;
  width: 100%;
  height: 112px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-items: center;
  top: 0;
  left: 0;
  font-family: "Courgette", serif;
  color: rgb(107,33,168);
  @media (min-width: 390px) {
    justify-content: space-between;
  }
  @media (min-width: 650px) {
    height: 160px;
  }
  @media (min-width: 960px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`

export const NavCollapse= styled.div`
  padding-left: 1.5rem;//24px
  width: 55%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  @media (min-width: 390px) {
    padding-left: 2rem;//32px
  }
  @media (min-width: 650px) {
    width: 50%
  }
  `

export const NavLogo = styled.span`
  
  display: inline-block;
  color: rgb(107, 33, 168);
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
  
  @media (min-width: 390px) {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
    padding: 0.5rem;
  }
  @media (min-width: 650px) {
    font-size: 2.25rem; /* 36px */
    line-height: 2.5rem; /* 40px */
  }
  @media (min-width: 960px) {
    font-size: 3rem; /* 48px */
    line-height: 1;
  }
  `
export const MainMenu = styled.div`
  display: flex;
  width: 45%;
  justify-content: end;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  
  @media (min-width: 390px) {
    padding-right: 2rem;
  }
  @media (min-width: 650px) {
   width: 50%;
  }
`