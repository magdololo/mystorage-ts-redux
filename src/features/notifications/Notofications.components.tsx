import styled from "styled-components";



const Message= styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
 
  //margin: 40px auto 0;
  //width: 500px;
  background-color: white;
  color: #71717A;
  transition: all 0.2s ease;
`
const MessageIcon = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(black, 0.25);
  



`

const MessageBody =styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  
  //vertical-align: middle;
  //padding: 30px 20px 30px 10px;
  //justify-content: center;
  //align-items: center;
  
`
const MessageTitle = styled.p`
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  font-weight: bolder;
  margin-top: 4px;
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
`
const MessageBodyText = styled.p`
  font-size: 1rem; /* 18px */
  line-height: 1.25rem; /* 28px */
  padding-top: 1rem;
  
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
`
const MessageBodyDate = styled.p`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  margin-top: 1.5rem;
  margin-left: 10rem;
  position: absolute;
  right: 15px;
  bottom: 5px;
  @media (min-width: 390px) {
    //font-size: 18px;
  }
  @media (min-width: 650px) {
    //font-size: 1.125rem; /* 18px */
    //line-height: 1.75rem; /* 28px */
  }
  @media (min-width: 960px) {
    //font-size: 1.25rem; /* 20px */
    //line-height: 1.75rem; /* 28px */
  }
`
const MessageButton = styled.button`
  position: relative;
  box-shadow: 0 3px rgba(black, 0.4);
  border: 1px solid purple;
  padding: 10px 15px;
  font-size: 16px;
  font-family: "Courgette", serif;
  color: lightgray;
  //outline: none;
  cursor: pointer;

  &:hover {
    background: rgba(black, 0.3);
  }

  &:active {
    background: rgba(black, 0.3);
    box-shadow: 0 0px rgba(black, 0.4);
    top: 3px;
  }
`
const MenuInviteList = styled.ul`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.175);
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 55%;
  width: 25%;
  display: block;
  height: auto;
  overflow: visible;
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  z-index: 100;
  ;
`

const MenuInviteItem = styled.li`
  text-align: center;
  padding: 4px;
  cursor: pointer;
  background-color: white;
  color: #6D28D9;
  &:hover &:active {
    background-color: #f3f3f3;
  }
  &.borderBottom {
    border-bottom: 1px solid lightgray;
  }
`

export {
    Message, MessageBody,MessageTitle,MessageBodyText,MessageButton,MessageIcon,MessageBodyDate,
    MenuInviteList, MenuInviteItem
}