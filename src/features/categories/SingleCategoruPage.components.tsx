import styled, {keyframes} from "styled-components";

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
  grid-area: productsOfCategory;
  //padding: 0.25rem;
  position: relative;
  display: block;
  //@keyframes mymove {
  //  from {right: -300px;}
  //  to {right: 800px;}
  //}
  
`
export const SingleProductBox = styled.div`
    width: 50%;
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
