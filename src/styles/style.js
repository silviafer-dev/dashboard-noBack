import { Link } from "react-router-dom";
import styled from "styled-components";

export const InputSearch = styled.input`
  padding: 7px 7px 7px 28px;
  border-radius: 10px;
  border: 2px solid #135846;
  color: #135846;
  font-size: 14px;
`;

export const NavLink = styled(Link)`
  text-align: center;
  list-style-type: none;
  font-size: 15px;
  text-decoration: none;
  text-align: left;
  padding: 8px;
  color: #799283;
`;
export const LinkList = styled(NavLink)`
  color: black;
`;
export const TRow = styled.tr`
  background-color: #ffffff;
  margin: 0;

  text-align: left;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
`;

export const TrHead = styled.tr`
  background-color: white;
  border-radius: 20px;
  margin-bottom: 2px;
  font-size: 14px;
`;

export const KpiNumber = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export const KpiTitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #787878;
`;
export const TableTd = styled.td`
  font-weight: 300;
  font-size: 10px;
  padding: 5px;
`;
export const NumberTd = styled.td`
  font-size: 10px;
  padding-right: 3px;
  font-weight: 600;
`;

export const StateUser = styled.td`
  color: ${(props) => (props.status === "ACTIVE" ? "green" : "red")};
  font-weight: 600;
  font-size: 12px;
`;
export const UserName = styled.h4`
  font-weight: 500;
  font-size: 12px;
  padding: 3px;
`;
export const UserEmail = styled.p`
  font-weight: 300;
  color: #b2b2b2;
  font-size: 10px;
`;
export const Footer = styled.p`
  font-weight: 600;
  font-size: 12px;
`;

export const Id = styled.div`
  font-weight: 300;
  color: #799283;
  font-size: 7px;
`;
export const Date = styled.td`
  font-weight: 500;
  font-size: 12px;
`;
export const PriceRoom = styled.td`
  font-weight: 700;
  font-size: 12px;
`;
export const FormLogin = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 450px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > label {
    color: #799283;
    margin: 10px;
  }
  & > input {
    margin: 5px;
    border: none;
    border-bottom: 1px solid #799283;
    background-color: transparent;
    resize: none;
    outline: none;
  }
`;
export const ReviewButton = styled.span`
  cursor: pointer;
  font-weight: 600;
  padding: 20px;
  color: ${(props) => (props.status === "Archive" ? "red" : "green")};
`;
export const PerNight = styled.span`
  color: grey;
  font-weight: 400;
`;
