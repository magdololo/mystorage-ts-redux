import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  max-width: 1000px;
  @media(max-width: 500px){
    width: 20rem;
  }
  @media(min-width: 501px) and (max-width: 800px){
    
    width: 70%;
    max-width: 26rem;
  }
  @media(min-width: 801px) and (max-width: 1100px){
    width: 50%;
    max-width: 28rem;
  }
  @media(min-width: 1101px){
    width: 28rem;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
 
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
  padding: 12px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-color: #5B21B6 #60A5FA;
  scrollbar-width: 5px;
  max-height: 80vh;
  @media (min-width: 60em) {
    margin: 0 auto;
    max-height: 85vh;
  }
`;

export const Header = styled.div`
  //border-radius: 8px 8px 0 0;
  //display: flex;
  //justify-content: space-between;
  //padding: 0.3rem;
`;

export const HeaderText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  padding-bottom: 0.8rem;
  padding-left: 2rem;
  align-self: center;
  color: rgb(55 65 81);
  
`;

// export const CloseButton = styled.button`
//   font-size: 0.8rem;
//   border: none;
//   border-radius: 3px;
//   margin-left: 0.5rem;
//   background: none;
//   :hover {
//     cursor: pointer;
//   }
// `;

export const Content = styled.div`
  color: rgb(107 114 128);
  max-height: 60rem;
  overflow-x: hidden;
  overflow-y: auto;
`;
