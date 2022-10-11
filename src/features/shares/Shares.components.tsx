import styled from "styled-components";

export const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto 8rem auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  background-color: white;
  z-index: 50;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  @media (min-width: 1440px) {
    margin: 0 4rem;
  }
`
export const SectionIncoming = styled.div`
  margin: 0 0.5rem;
  @media (min-width: 580px) {
    width: 100%;
    margin: 0  auto;
  }
  @media (min-width: 960px) {
    width: 45%;
    margin-left : 5%;
  }
`



export const SectionOutgoing = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 960px) {
    width: 45%;
    margin-left: 5%;
  }
`
export const Button = styled.button`
  font-size: 12px;
  line-height: 32px;
  text-transform: uppercase;
  font-weight: bold;
  color: #581C87;
  border: 2px solid rgb(91, 33, 182);
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  width: 30%;
  padding: 4px 8px;
  margin: 0 2px;
  &.marginLeft {
    margin-left: 5%;
   
    
    
  }
`
export const ButtonSingle = styled(Button)`
    font-size: 10px;
    line-height: 28px;
    width: 80%;
`
export const SingleInvite = styled.div`
    height: 200px;
    padding: 0.875rem;
`