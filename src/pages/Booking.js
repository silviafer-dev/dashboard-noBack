import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GetFullDate } from "../components/GetFullDate";
import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import {
  fetchBooking,
  removeBooking,
  selectStateDetail,
} from "../features/bookings/bookingsSlice";
import { UpdateBooking } from "../features/bookings/UpdateBooking";
import { ContainerColumn, ContainerPage } from "../styles/containers";
import {
  ButtonDelete,
  ButtonEdit,
  CheckBlock,
  ContainerDetail,
  IdDetail,
  ItemsDetail,
  LinkDetail,
  NameDetail,
} from "../styles/detail-page";
import { ImageBookingRoom, Ribbon } from "../styles/style-image";

export function Booking({ open, setOpen }) {
  const { id } = useParams();
  const booking = useSelector(selectStateDetail);
  const [newBooking, setNewBooking] = useState({});

  const [edit, setEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooking(id));
  }, [dispatch, id]);

  const handleRemove = () => {
    dispatch(removeBooking(id));
  };
  const handleOpen = (booking) => {
    setEdit(booking);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setNewBooking(newBooking);
  };

  useEffect(() => {
    setNewBooking(booking);
  }, [booking]);

  if (!booking.id) {
    return null;
  }
  return (
    <ContainerPage open={open}>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Booking Detail" open={open} setOpen={setOpen} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ContainerDetail
            style={{
              width: "50%",
              margin: "30px 0 30px 30px",
              borderRadius: "20px 0 0 20px",
              height: "580px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                src={booking.photo_guest}
                alt="guest"
                style={{ width: "150px" }}
              />
              <div style={{ marginLeft: "20px" }}>
                <NameDetail>{booking.full_name}</NameDetail>
                <IdDetail>ID {booking.id}</IdDetail>
              </div>
            </div>
            <CheckBlock>
              <div>
                <ItemsDetail>Check In</ItemsDetail>
                <GetFullDate date={booking.check_in} />
              </div>
              <div>
                <ItemsDetail>Check Out</ItemsDetail>
                <GetFullDate date={booking.check_out} />
              </div>
            </CheckBlock>

            <ItemsDetail>Room Info</ItemsDetail>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {booking.room_type} - {booking.room_number}
            </p>

            <ItemsDetail>Special request</ItemsDetail>
            <p style={{ fontSize: "14px" }}>{booking.special_request}</p>
            <div>
              <ButtonEdit
                onClick={() => {
                  handleOpen(booking);
                }}
              >
                Edit
              </ButtonEdit>
              <ButtonDelete
                onClick={() => {
                  handleRemove(booking.id);
                  navigate(-1);
                }}
              >
                🗑️
              </ButtonDelete>

              <UpdateBooking
                openModal={openModal}
                edit={edit}
                handleClose={handleClose}
              />
              <LinkDetail to="/bookings">← Back to Bookings</LinkDetail>
            </div>
          </ContainerDetail>
          <ImageBookingRoom
            style={{
              backgroundImage: `url(${booking.photo_room})`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            <Ribbon status={booking.status}>
              <span>{booking.status}</span>
            </Ribbon>
            <p
              style={{
                margin: " 0 0 0 40px",
                color: "white",
                fontSize: "16px",
              }}
            >
              {booking.room_type}
            </p>
            <p
              style={{
                margin: "20px 30px 30px 40px",
                color: "white",
                fontSize: "12px",
                opacity: " 0.6",
              }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              beatae, dolorem voluptatum expedita quasi cumque nam error
              praesentium officia.
            </p>
          </ImageBookingRoom>
        </div>
      </ContainerColumn>
    </ContainerPage>
  );
}
