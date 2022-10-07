import styled from "styled-components";
import { mediaQueries } from "./mediaQueries";

interface SearchInput {
    width: Number;
}
export const SearchInput = styled.div<SearchInput>`
  display: block;
  width: 6em;
  ${mediaQueries("lg")`
    background-color: green;
  `};
  ${props => mediaQueries("md")(`width: ${props.width}px`)}
`;