import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "./modal";
import { Id } from "./style";
import { Button, CheckStatusRoom } from "./style-buttons";

export const ContainerDetail = styled.div`
  margin: 30px 0 30px 30px;
  background-color: white;
  border-radius: 20px;
  border: none;
  height: 100%;
  padding: 10px 30px;
`;
export const ContainerDetailBooking = styled.div`
  background-color: white;
  border-radius: 20px;
  border: none;
  padding: 10px 30px;
  width: 50%;
  margin: 30px 0 30px 30px;
  border-radius: 20px 0 0 20px;
  height: 620px;
`;

export const NameDetail = styled.h2`
  padding: 30px 30px 0 0px;
`;
export const IdDetail = styled(Id)`
  font-size: 15px;
  padding: 0 30 px 0 0;
`;

export const ItemsDetail = styled.p`
  padding-top: 20px;
  color: #799283;
  font-size: 14px;
`;
export const CheckBlock = styled.div`
  padding: 20px 20px 20px 0;
  display: grid;
  grid-template-columns: auto auto;
  border-bottom: 2px solid #c5c5c5;
`;
export const ButtonStatus = styled(Button)`
  width: fit-content;
  margin: 20px 0;
`;

export const LinkDetail = styled(Link)`
  text-decoration: none;
  margin: -10px;
  height: 50px;
  align-items: center;
  color: #799283;
  font-weight: 600;
`;
export const ModalDetail = styled(Modal)`
  top: 30%;
  left: 40%;
`;
export const RoomBlock = styled.div`
  display: flex;
`;
export const PhotoDetail = styled.img`
  width: 270px;
  height: 250px;
  margin: 0 50px 20px 0;
  border-radius: 20px;
`;

export const CheckStatusButton = styled(CheckStatusRoom)`
  width: fit-content;
`;
export const PriceDetail = styled.div`
  font-weight: 700;
  font-size: 16px;
`;
export const StatusUserDetail = styled.div`
  color: ${(props) => (props.status === "ACTIVE" ? "green" : "red")};
  font-weight: 600;
`;
export const TitleDetail = styled.h3`
  font-weight: 600;
  font-size: 30px;
`;
