import styled, {keyframes} from "styled-components";
import {SectionBoxProps} from "../api/Home.components";

export const MainContent = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: [categories] 1fr [productsOfCategory] 2fr;
  grid-template-areas:
    "categories productsOfCategory ";
  grid-column-gap: 10px;
  justify-content: space-around;


`

//
export const CategoriesSideBar = styled.div`
 //background: #1f2128;
  color: red;
  grid-area: categories;
  padding: 0.25rem;
  //animation-name: example;
  //animation-duration: 10s;
  //@keyframes example {
  //  0%   {display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));gap: 0.5rem; }
  //  //25%  {background-color: yellow;}
  //  //50%  {background-color: blue;}
  //  //75%  { }
  //  100% {display: grid;
  //    grid-template-columns: repeat(1, minmax(0, 1fr));}
  //}
`;

export const ProductsBox = styled.div`
  color: yellow;
  grid-area: productsOfCategory;
  padding: 0.25rem;
`
export const ProductsListContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
 
`
export const ProductsListBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 2rem;
 
  //@keyframes mymove {
  //  from {right: -300px;}
  //  to {right: 800px;}
  //}
  
`
export interface SingleProductBoxProps{
    width: string;
}
export const SingleProductBox = styled.div<SingleProductBoxProps>`
    width: ${props=>props.width};
  height: 240px;
    margin: 0.3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.125rem;
    cursor: pointer;


`
export const SingleCategoryBox = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0.3rem;
  &.singleOtherCategory {
    width: 46%;
    
  }
`
export const ProductNameBox = styled.div`
  margin-bottom: 1rem;
  height: 90px;
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
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
  }
  
  
    `
