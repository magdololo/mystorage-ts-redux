import styled from "styled-components";


export const AddProductButton = styled.button`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  color:white;
  text-transform: uppercase;
  background-color: rgb(107, 33, 168);
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.25rem; /* 4px */
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  &.flex{
    display: block;
  } 
  &:hover{
    box-shadow: 0 5px 6px -2px rgb(0 0 0 / 0.1), 0 2px 2.5px -2px rgb(0 0 0 / 0.1);
    background-color: rgb(88, 28, 135);
  }
  @media(min-width: 1280px){
    padding: 1rem;
    margin: 0 auto;
  }

`
