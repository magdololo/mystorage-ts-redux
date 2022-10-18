import styled, {keyframes} from "styled-components";
import {SectionBoxProps} from "../api/Home.components";

export const MainContent = styled.div`
  @media(min-width : 1200px){
    display: grid;
    margin: 0 auto;
    grid-template-columns: [categories] 1fr [productsOfCategory] 2fr;
    grid-template-areas:
    "categories productsOfCategory ";
    grid-column-gap: 10px;
    justify-content: space-around;
  }
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
export interface ProductsListBoxProps {
    justifyContent: string;
}
export const ProductsListBox = styled.div<ProductsListBoxProps>`
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  flex-wrap: wrap;
  justify-content: ${props => props.justifyContent || "space-between"};
  margin: 0 2rem;
 
  //@keyframes mymove {
  //  from {right: -300px;}
  //  to {right: 800px;}
  //}
  
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
 export const SinglePageTitle = styled.h1`
   font-size: 1.125rem; /* 24px */
   line-height: 1.175rem; /* 32px */
   padding: 0.5rem 1.5rem;
   text-align: center;
   color: #737373;
   font-weight: bold;
   margin-bottom: 1rem;
   text-transform: capitalize;
   @media (min-width: 450px) {
     font-size: 1.25rem; /* 30px */
     line-height: 1.75rem; /* 36px */

   }
   @media (min-width: 650px) {
     font-size: 1.5rem; /* 36px */
     line-height: 2rem; /* 40px */
   }
   @media (min-width: 960px) {
     font-size: 1.5rem; /* 48px */
     line-height: 2rem;
   }      
  ;
    
`
