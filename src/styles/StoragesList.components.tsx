import styled from "styled-components";
import {SectionProps} from "./Home.components";


export const StorageList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6;
`
export interface StorageItemProps {
    primary: boolean
}
export const StorageItem = styled.li<StorageItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
  color: ${props => props.primary ? "rgb(107, 33, 168)" : "#52525B"};
  cursor: pointer;
  
  &:hover {
    font-size: 20px;
    color: rgb(107, 33, 168);
    transition-property: color, font-size;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    
  }
  &:active{
    color: rgb(107, 33, 168);
  }
`
export const ArrowRight = styled.span`
  color: #3F3F46;
  margin: 0 8px;
  width: 20px;
  height: 20px;
  display: inline-block;
  list-style: none;
  
`