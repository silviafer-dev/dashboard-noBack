import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiSearch } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";

export const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 6px;
  bottom: 11px;
  font-size: 20px;
`;

export const IconEdit = styled(FaEdit)`
  color: #135846;
  font-size: 26px;
  cursor: pointer;
  margin: 20px 0;
  &:hover {
    opacity: 0.6;
  }
`;
export const IconDelete = styled(RiDeleteBin6Line)`
  color: #135846;
  font-size: 26px;
  cursor: pointer;
  margin: 20px 0 20px 50px;
  &:hover {
    opacity: 0.6;
  }
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #135846;
  margin: 2%;
  padding: 15px;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const StyledIconReviewGreen = styled(StyledFontAwesomeIcon)`
  color: green;
  font-size: 1.4rem;
  margin: 5px;
`;
export const StyledIconReviewRed = styled(StyledFontAwesomeIcon)`
  color: red;
  font-size: 1.4rem;
  margin: 5px;
`;

export const StyledIconKpi = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ffedec;
  color: red;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  & svg {
    font-size: 20px;
  }
`;
