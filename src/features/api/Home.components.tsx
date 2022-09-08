import styled from "styled-components";
import PropTypes from "prop-types";

const BoxMain= styled.div`
  width: 100%;
  background-color: white;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
`
const Nav = styled.nav`
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

const NavCollapse= styled.div`
  padding-left: 1.5rem;//24px
  width: 66.6%;
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

const NavLogo = styled.span`
  
  display: inline-block;
  color: rgb(107, 33, 168);
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  
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
const MainMenu = styled.div`
  display: flex;
  width: 33.4%;
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
const MenuButtonLogin = styled.button`
  display: inline-block;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  color: gray;
  font-family: "Noto Sans", sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
  &:hover {
    border-bottom: 2px solid rgb(107, 33, 168);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  &:focus {
    outline: none;
  }
  @media (min-width: 390px) {
    font-size: 18px;
  }
  @media (min-width: 650px) {
    margin-right: 1rem;
  }
  @media (min-width: 960px) {
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
  }
`
const MenuButtonRegister = styled.button`
  display: none;
  
  @media (min-width: 390px) {
    justify-content: center;
  }
  @media (min-width: 650px) {
    display: block;
  }
`
const MainMenuLinkRegister = styled.link`
  display: inline-block;
  padding: 0.875rem 1rem;
  background-color: rgb(107, 33, 168);
  color: white;
  font-family: "Noto Sans", sans-serif;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.25;
  border-radius: 1rem; /* 16px */
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  &:hover {
    background-color:  rgb(88, 28, 135);
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  @media (min-width: 960px) {
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
  }
`
const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 9rem auto 0;
  font-family: "Noto Sans", sans-serif;
  @media (min-width: 650px) {
    flex-direction: row;
    margin-top: 3rem;
    
  }
  @media (min-width: 960px) {
    flex-direction: row;
    max-width: 72rem;
  }
`
const HeaderSectionText = styled.div`
  padding: 0 3rem;
  @media (min-width: 650px) {
    text-align: left;
    width: 60%;
    margin-right: 2rem;
    max-width: 42rem;

  }
`
const HeaderSectionTextTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(35, 55, 72);
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px, 1.375 */
  font-weight: bold;
  @media (min-width: 650px) {
    font-size: 2.25rem; /* 36px */
    line-height: 2.5rem; /* 40px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 4.5rem; /* 72px */
    line-height: 1;/* 1.25 */
  }
`
const HeaderSectionTextTSubtitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgb(113, 113, 122);
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px ,2*/
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px 2.5*/
  }
  `
const HeaderSectionButtonRegister = styled(MainMenuLinkRegister)`
  display: block;
  margin: 0 auto;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px 1.25*/
  @media (min-width: 650px) {
    display: inline-block;
    padding: 0.875rem 1.5rem;
  }
`

const HeaderSectionPhoto = styled.div`

`
export {Nav,BoxMain, NavCollapse, NavLogo, MainMenu, MenuButtonLogin, MenuButtonRegister,MainMenuLinkRegister, MainSection,
  HeaderSectionText, HeaderSectionTextTitle, HeaderSectionTextTSubtitle, HeaderSectionButtonRegister }
// interface NazwaZmiennejProps {
//   color: string | boolean |"block" |"invisible"
// }
// const NazwaZmiennej = styled.div<NazwaZmiennejProps>`{
//   color: ${props=>props.color};
// } //nazwa zmiennej jest okreslona w dokumentacji nie przez nas
// `
