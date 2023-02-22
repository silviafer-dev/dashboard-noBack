import styled from "styled-components";

export const Image = styled.img`
  width: 70px;
  height: 70px;
  border: 1px solid grey;
  border-radius: 8px;
`;
export const Logo = styled.img`
  padding: 20px 0;
`;
export const ImageBookingRoom = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50%;
  height: 580px;
  margin: 30px 30px 30px 0;
  border-radius: 0 20px 20px 0;
  -moz-box-shadow: inset 10 -130px 130px -130px rgb();
  -webkit-box-shadow: inset 10 -130px 130px -130px rgb();
  box-shadow: inset 0 -130px 130px 0px rgba(0, 0, 0, 0.8);
`;

export const Ribbon = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 0;
  overflow: hidden;
  width: 155px;
  height: 155px;
  text-align: right;
  > span {
    font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 40px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    width: 205px;
    display: block;
    background: ${(props) =>
      props.status === "In progress"
        ? "#fec260"
        : "" || props.status === "Check In"
        ? "#5ad07a"
        : "" || props.status === "Check Out"
        ? "#e23428"
        : "" || props.status === "Available"
        ? "green"
        : "red"};
    position: absolute;
    top: 38px;
    right: -49px;
  }
`;
