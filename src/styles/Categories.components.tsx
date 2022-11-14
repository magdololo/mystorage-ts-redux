import styled from "styled-components";

export const MainBox = styled.div`
 display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  @media (min-width: 750px) {
    gap: 1rem; 
    margin: 0 3rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
;
`
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

export const CategoriesSideBar = styled.div`
  color: red;
  grid-area: categories;
  padding: 0.25rem;
`;

export const ProductsListContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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

export const EditCategoriesButtonComponent = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
 
`


