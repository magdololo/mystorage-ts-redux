import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  width: 40%;
  height: 60%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  @media(max-width: 600px){
    width: 85%;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 800;
`;

export const StyledModal = styled.div`
  z-index: 200;
  background: white;
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
  padding: 2em;
  overflow-y: scroll;
  height: 90%;
  @media (min-width: 60em) {
    margin: 0 auto;
    
  }
`;

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding-left: 10%;
  padding-top: 1.3em;
  padding-bottom: 1.3em;
`;

export const HeaderText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  //padding-bottom: 0.8rem;
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
  //max-height: 60rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

