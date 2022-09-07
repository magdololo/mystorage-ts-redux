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
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
// interface NazwaZmiennejProps {
//   color: string | boolean |"block" |"invisible"
// }
// const NazwaZmiennej = styled.div<NazwaZmiennejProps>`{
//   color: ${props=>props.color};
// }
// `
export {Nav,BoxMain, NavCollapse, NavLogo}

