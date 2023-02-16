import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
  ButtonStatus,
  CheckBlock,
  ContainerDetail,
  IdDetail,
  ItemsDetail,
  LinkDetail,
  NameDetail,
} from "../styles/detail-page";

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

  useEffect(() => {
    setNewBooking(booking);
  }, [booking]);

  const handleClose = () => {
    setOpenModal(false);
    setNewBooking(newBooking);
  };

  if (!booking.id) {
    return null;
  }
  return (
    <ContainerPage open={open}>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Booking Detail" open={open} setOpen={setOpen} />
        <ContainerDetail>
          <NameDetail>{booking.full_name}</NameDetail>
          <IdDetail>ID {booking.id}</IdDetail>
          <ItemsDetail>Order Date </ItemsDetail>
          <p> {booking.order_date.slice(0, 10)}</p>
          <CheckBlock>
            <div>
              <ItemsDetail>Check In</ItemsDetail>
              <p>{booking.check_in.slice(0, 10)}</p>
            </div>
            <div>
              <ItemsDetail>Check Out</ItemsDetail>
              <p>{booking.check_out.slice(0, 10)}</p>
            </div>
          </CheckBlock>

          <ItemsDetail>Room Type</ItemsDetail>
          <p>{booking.room_type} </p>
          <ItemsDetail>Room Number </ItemsDetail>
          <p>{booking.room_number}</p>
          <ItemsDetail>Special request</ItemsDetail>
          <p>{booking.special_request}</p>
          <ButtonStatus status={booking.status}>{booking.status}</ButtonStatus>
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
          </div>
          <LinkDetail to="/bookings">← Back to Bookings</LinkDetail>
        </ContainerDetail>
      </ContainerColumn>
    </ContainerPage>
  );
}
