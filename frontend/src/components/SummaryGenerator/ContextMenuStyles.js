
import styled, { css } from "styled-components";
export const MenuContextContainer = styled.div`
  border: 1px solid #ffffff2d;
  border-radius: 4px;
  padding: 18px;
  box-sizing: border-box;
`;
export const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  ${({ top, left }) => css`
    top: ${top-50}px;
    left: ${left-50}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 18px 12px;
  }
  /* hover */
  ul li:hover {
    /* cursor: none */=
  }
`;