import styled from "styled-components";

const Message= styled.div`
  width: 95%;
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
  width: 80%;
  display: flex;
  flex-direction: column;
`
const MessageTitle = styled.p`
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  font-weight: bolder;
  margin-top: -14px;
  @media (min-width: 650px) {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
`
const MessageBodyText = styled.p`
  font-size: 1rem; /* 18px */
  line-height: 1.25rem; /* 28px */
  padding-top: 1rem;
  margin-bottom: 1rem;
  
  
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