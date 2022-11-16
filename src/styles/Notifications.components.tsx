import styled from "styled-components";

const Message= styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
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
  width: 90%;
  display: flex;
  flex-direction: column;
`
const MessageTitle = styled.p`
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  font-weight: bolder;
  margin-top: -16px;
  color: #6b7280;
  @media (min-width: 500px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
`
const MessageBodyText = styled.p`
  font-size: 1rem; /* 18px */
  line-height: 1.55rem; /* 28px */
  padding-top: 1rem;
  padding-left: 0.5rem;
  margin-bottom: 0.6rem;
  @media (min-width: 560px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
`
const MessageBodyDate = styled.p`
  font-size: 0.675rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  align-self: end;
  padding-right: 0.5rem;
  @media (min-width: 550px) {
    font-size: 0.825rem; /* 14px */
    line-height: 1.25rem; /* 20px */
    
  }
`

const MenuInviteList = styled.ul`
  margin: 0.5rem auto;
  //box-shadow: 0 3px 6px rgba(0, 0, 0, 0.175);
  //border: 1px solid #ccc;
  //list-style-type: none;
  //padding: 0;
  //margin: 0 0 0 55%;
  //width: 25%;
  //display: block;
  //height: auto;
  //overflow: visible;
  //position: absolute;
  //top: 2rem;
  //right: 2.5rem;
  //z-index: 100;
  ;
`
// bg-white rounded-lg w-full
const MenuInviteItem = styled.li`
  
  padding: 4px;
  cursor: pointer;
  background-color: white;
  color: #6D28D9;
  width: 100%;
  
  &:hover &:active {
    background-color: #f3f3f3;
  }
  &.borderBottom {
    border-bottom: 1px solid lightgray;
  }
`
const MenuNotifications = styled.span`
  padding: 0.825rem 0;
  font-size: 1rem;
  line-height: 1.25rem;
  display: inline-block;
  font-family: "Noto Sans", sans-serif;
  position: relative;
`
export {
    Message, MessageBody,MessageTitle,MessageBodyText,MessageIcon,MessageBodyDate,
    MenuInviteList, MenuInviteItem,MenuNotifications
}