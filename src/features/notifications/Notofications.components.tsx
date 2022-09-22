import styled from "styled-components";


const Message= styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: relative;
  //margin: 40px auto 0;
  //width: 500px;
  background-color: white;
  color: #71717A;
  transition: all 0.2s ease;
`
const MessageIcon = styled.div`
  width: 20%;
  vertical-align: middle;
  width: 60px;
  padding: 30px;
  text-align: center;
  background-color: rgba(black, 0.25);
  



`
const MessageBody =styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  padding: 30px 20px 30px 10px;

  
`
const MessageBodyText = styled.p`
    line-height: 1.2;
    margin-top: 4px;
    font-size: 1.4rem;
`
const MessageBodyDate = styled.p`
    font-size: 1.1rem;
    padding-top: 2px;
`
const MessageButton = styled.button`
  position: relative;
  margin: 15px 5px -10px;
  background-color: rgba(black, 0.25);
  box-shadow: 0 3px rgba(black, 0.4);
  border:none;
  padding: 10px 15px;
  font-size: 16px;
  font-family: "Courgette", serif;
  color: #fff;
  outline: none;
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
const MessageCloseButton = styled.button`
  position: absolute;
  background-color: rgba(black, 0.3);
  color: #fff;
  border: none;
  outline: none;
  font-size: 20px;
  right: 5px;
  top: 5px;
  opacity: 0;
  cursor: pointer;
  &:hover {
    background-color: rgba(black, 0.5);
  }
`

export {
    Message, MessageBody,MessageBodyText,MessageButton,MessageCloseButton,MessageIcon,MessageBodyDate
}