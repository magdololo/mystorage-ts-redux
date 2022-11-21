import styled from "styled-components";


export const ProductsBox = styled.div`
 
  grid-area: productsOfCategory;
  padding: 0.25rem;
`
export interface ProductsListBoxProps {
    justifyContent: string;
}
export const ProductsListBox = styled.div<ProductsListBoxProps>`
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  flex-wrap: wrap;
  justify-content: ${props => props.justifyContent || "space-between"};
  @media(min-width: 750px){
    margin: 0 2rem;
  }
`

export interface SingleProductBoxProps{
    width: string;
    height: string;
}
export const SingleProductBox = styled.div<SingleProductBoxProps>`
    width: 100%;
    height: auto;
    margin: 0.3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.125rem;
    cursor: pointer;
  @media(min-width: 700px){
    width: 47%;
    height: auto;
  }
`

export const ProductNameBox = styled.div`
  height: 40px;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  color: #6b7280;
  font-weight: bold;
  text-transform: capitalize;
  padding-bottom: 1rem;
  @media (min-width: 390px) {
    font-size: 15px;
  }
  @media (min-width: 650px) {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
  }
  @media (min-width: 1280px) {
    height: 90px;
  }
  
    `
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