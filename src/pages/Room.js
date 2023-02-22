import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import {
  fetchRoom,
  removeRoom,
  selectStateDetail,
} from "../features/rooms/roomsSlice";
import { UpdateRoom } from "../features/rooms/UpdateRoom";
import { ContainerColumn, ContainerPage } from "../styles/containers";
import {
  ContainerDetailBooking,
  ItemsDetail,
  LinkDetail,
  PhotoDetail,
  PriceDetail,
  RoomBlock,
} from "../styles/detail-page";
import { IconDelete, IconEdit } from "../styles/icons";
import { Id, PerNight } from "../styles/style";
import { ImageBookingRoom, Ribbon } from "../styles/style-image";

export function Room({ open, setOpen }) {
  const { id } = useParams();
  const room = useSelector(selectStateDetail);
  const [edit, setEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoom(id));
  }, [dispatch, id]);

  const handleRemove = () => {
    dispatch(removeRoom(id));
    navigate(-1);
  };
  const handleOpen = (room) => {
    setEdit(room);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  return (
    <ContainerPage>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Room Detail" open={open} setOpen={setOpen} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ContainerDetailBooking>
            <LinkDetail to="/rooms">
              <IoIosArrowRoundBack style={{ fontSize: "60px" }} />
            </LinkDetail>
            <RoomBlock>
              <div>
                <Id style={{ fontSize: "10px", fontWeight: "bold" }}>
                  ID: {room.id}
                </Id>
                <ItemsDetail>Room Type </ItemsDetail>
                <p style={{ fontWeight: "bold" }}>{room.room_type}</p>
                <ItemsDetail>Room Number </ItemsDetail>
                <p style={{ fontWeight: "bold" }}>{room.room_number}</p>
              </div>
            </RoomBlock>

            <ItemsDetail>Facilities </ItemsDetail>
            <p>{room.amenities}</p>
            <ItemsDetail>Description </ItemsDetail>
            <p>{room.description}</p>
            <ItemsDetail>Price </ItemsDetail>
            <PriceDetail>
              <span> $</span> {room.price} <PerNight>/night</PerNight>
            </PriceDetail>
            <ItemsDetail>Offer Price </ItemsDetail>
            <PriceDetail>
              <span> $</span>
              {room.discount} <PerNight>/night</PerNight>
            </PriceDetail>
            <div>
              <IconEdit
                onClick={() => {
                  handleOpen(room);
                }}
              />
              <IconDelete
                onClick={() => {
                  handleRemove(room.id);
                }}
              />

              <UpdateRoom
                openModal={openModal}
                edit={edit}
                handleClose={handleClose}
              />
            </div>
          </ContainerDetailBooking>
          <ImageBookingRoom
            style={{
              backgroundImage: `url(${room.photo})`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              position: "relative",
              height: "620px",
            }}
          >
            <Ribbon status={room.status}>
              <span>{room.status}</span>
            </Ribbon>
            <p
              style={{
                margin: " 0 0 0 40px",
                color: "white",
                fontSize: "16px",
              }}
            >
              {room.room_type}
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
