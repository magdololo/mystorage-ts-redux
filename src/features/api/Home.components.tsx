import styled from "styled-components";


const BoxMain= styled.div`
  width: 100%;
  background-color: white;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem 0;
`
const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-items: center;
  color: rgb(107,33,168);
  @media (min-width: 390px) {
    justify-content: space-between;
  }
  @media (min-width: 450px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 960px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const NavCollapse= styled.div`
  width: 80%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  @media (min-width: 650px) {
    width: 50%
  }
  `

const NavLogo = styled.span`
  font-family: "Courgette", serif;
  display: inline-block;
  color: rgb(107, 33, 168);
  font-size: 1.25rem; /* 24px */
  line-height: 1.75rem; /* 32px */
  
  @media (min-width: 450px) {
    font-size: 1.5rem; /* 30px */
    line-height: 2rem; /* 36px */
   
  }
  @media (min-width: 650px) {
    font-size: 1.8rem; /* 36px */
    line-height: 2.2rem; /* 40px */
  }
  @media (min-width: 960px) {
    font-size: 2rem; /* 48px */
    line-height: 1;
  }
  `
const MainMenu = styled.div`
  
  display: flex;
  justify-content: end;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  flex-grow: 1;
  align-items: center;
  @media (min-width: 800px) {
    width: 50%;
  }
`

const MenuButtonLogin = styled.button`
  display: inline-block;
  color: gray;
  font-family: "Noto Sans", sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
 
  @media (min-width: 390px) {
    font-size: 15px;
  }
  @media (min-width: 650px) {
    margin-right: 1rem;
  }
  @media (min-width: 960px) {
    font-size: 1rem; /* 20px */
    line-height: 1.5rem; /* 28px */
  }
`
const MainMenuLinkLogin = styled.link`
  display: inline-block;
  padding: 0.875rem 0;
  &:hover {
    border-bottom: 2px solid rgb(107, 33, 168);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  &:focus {
    outline: none;
  }
`
const MenuFlag = styled(MenuButtonLogin)`
  display: inline-block;
  margin-left: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (min-width: 650px) {
    font-size: 1.5rem; /* 20px */
    line-height: 1.5rem; /* 28px */
  }
  
`

const MainMenuSpan = styled(MainMenuLinkLogin)`
  padding: 0;
  border: 1px solid rgb(230,230,230);
  background-size: cover;
  border-radius: 0.2rem; /* 16px */
  &:hover {
    border-bottom: none;
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
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5rem;
  border-radius: 0.5rem; /* 16px */
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
  margin: 11rem auto 0;
  font-family: "Noto Sans", sans-serif;
  @media (min-width: 650px) {
    flex-direction: row;
    margin-top: 3rem;
  }
  @media (min-width: 960px) {
    max-width: 72rem;
  }
`
const HeaderSectionBoxText = styled.div`
  padding: 0 1.5rem;
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
  color: rgb(54, 70, 84);
  font-size: 2.2rem;/*1.875rem; /* 30px */
  line-height: 3rem;/*2.25rem; /* 36px, 1.375 */
  font-weight: bold;
  @media (min-width: 650px) {
    font-size: 2.25rem; /* 36px */
    line-height: 3.25rem; /* 40px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 3rem; /* 72px */
    line-height: 1.5;/* 1.25 */
  }
  @media (min-width: 1280px) {
    font-size: 4.2rem; /* 72px */
    line-height: 1.25;/* 1.25 */
  }
`
const HeaderSectionTextTSubtitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgb(113, 113, 122);
  font-size: 1.125rem; /* 18px */
  line-height: 2.25rem; /* 28px ,2*/
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 2.25rem; /* 28px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 1.25rem; /* 20px */
    line-height: 2.75rem; /* 28px 2.5*/
  }
  `
const HeaderSectionButtonRegister = styled(MainMenuLinkRegister)`
  display: block;
  margin: 0 auto;
  font-size: 1rem; /* 18px */
  line-height: 1.5rem; /* 28px 1.25*/
  @media (min-width: 650px) {
    font-size: 15px;
    display: inline-block;
    padding: 0.825rem 1rem;
  }
  @media (min-width: 960px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.5rem; /* 28px 1.25*/
  }
`

const HeaderSectionBoxPhotos = styled.div`
  padding: 2.5rem 1.5rem;
  @media (min-width: 650px) {
    width: 40%;
    margin-top: 5rem;
    padding-bottom: 0;
  }
`
const PhotoBox = styled.img`
  max-height: 32rem;
  @media (min-width: 960px) {
    max-height: 36rem;
  }
`
export interface SectionProps {
  primary: boolean
}
const Section = styled.div<SectionProps>`
  width: 100%;
  box-shadow: ${props => props.primary ? "0 0 3em #E7E5E4" : "none"};
`
export interface SectionBoxProps {
  size: string
}
const SectionBox = styled.div<SectionBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${props=>props.size};
  font-family: "Noto Sans", sans-serif;
  .noVisibilityOnMobile{
    display: none;
  }
  @media (min-width: 650px) {
    flex-direction: row;
    .noVisibilityOnMobile{
      display: block;
    }
    .visibilityOnMobile {
      display: none;
    }
  }
  @media (min-width: 960px) {
    max-width: 72rem;
    margin: 0 auto;
  }
`
const SectionBoxPhotos = styled.div`
  padding-bottom: 2.5rem;
  display: flex;
  justify-content: center;
  @media (min-width: 650px) {
    padding: 0 1.5rem 0;
    width: 40%;
  }
`

const SectionBoxText = styled.div`
  padding: 0 3rem; //3
  @media (min-width: 650px) {
    width: 60%;
    text-align: left;
    max-width: 42rem;
  }
`
const SectionTextTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: rgb(65, 82, 97);
  font-size: 1.75rem;/*1.875rem; /* 30px */
  line-height: 2.5rem;/*2.25rem; /* 36px, 1.375 */
  font-weight: bold;
  @media (min-width: 650px) {
    font-size: 2rem; /* 36px */
    line-height: 3rem; /* 40px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 2.8rem; /* 72px */
    line-height: 1.35;/* 1.25 */
  }
`
const SectionTextSubtitle = styled.h4`
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgb(141, 141, 153);
  font-size: 1.125rem; /* 18px */
  line-height: 2rem; /* 28px ,2*/
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 2rem; /* 28px */
    text-align: left;
  }
  @media (min-width: 960px) {
    font-size: 1.25rem; /* 20px */
    line-height: 2.5rem; /* 28px 2.5*/
  }
`
const FooterAuthor = styled.div`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  .footer-header{
    font-size: 0.75rem; /* 12px */
    line-height: 1rem; /* 16px */
    color: rgb(163, 163, 163);
    font-family: "Noto Sans",sans-serif;
  }
  .icons {
    padding-right: 0.25rem;
  }
  @media (min-width: 650px) {
    padding-bottom: 2.5rem;
  }
  @media (min-width: 960px) {
    .footer-header{
      font-size: 0.85rem; /* 12px */
      line-height: 1.1rem; /* 16px */
    }
  }
`
const FooterRegulations = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 2rem;
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  color: rgb(163, 163, 163);
  font-family: "Noto Sans",sans-serif;
  .footerRegulationsLink {
    margin: 0 0.5rem;
    color: rgb(107, 33, 168);
  }
  .footerRegulationsSpan {
    @media (min-width: 650px) {
     margin-left: 3rem;
    }
  }
  @media (min-width: 960px) {
    font-size: 0.85rem; /* 12px */
    line-height: 1.1rem; /* 16px */
  }
`

export {
  Nav,
  BoxMain,
  NavCollapse,
  NavLogo,
  MainMenu,
  MenuFlag,
  MainMenuSpan,
  MenuButtonLogin,
  MainMenuLinkLogin,
  MenuButtonRegister,
  MainMenuLinkRegister,
  MainSection,
  HeaderSectionBoxText,
  HeaderSectionTextTitle,
  HeaderSectionTextTSubtitle,
  HeaderSectionButtonRegister,
  HeaderSectionBoxPhotos,
  PhotoBox,
  Section,SectionBox, SectionBoxPhotos, SectionBoxText, SectionTextTitle, SectionTextSubtitle,
  FooterAuthor, FooterRegulations

}