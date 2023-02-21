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
  ButtonDelete,
  CheckStatusButton,
  ContainerDetail,
  ItemsDetail,
  LinkDetail,
  PhotoDetail,
  PriceDetail,
  RoomBlock,
} from "../styles/detail-page";
import { IconDelete, IconEdit } from "../styles/icons";
import { Id, PerNight } from "../styles/style";

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
        <ContainerDetail>
          <LinkDetail to="/rooms">
            <IoIosArrowRoundBack style={{ fontSize: "60px" }} />
          </LinkDetail>
          <RoomBlock>
            <PhotoDetail src={room.photo} alt="" />
            <div>
              <Id>ID {room.id}</Id>
              <ItemsDetail>Room Type </ItemsDetail>
              <p>{room.room_type}</p>
              <ItemsDetail>Room Number </ItemsDetail>
              <p>{room.room_number}</p>
            </div>
          </RoomBlock>
          <ItemsDetail>Facilities </ItemsDetail>
          <p>{room.facilities}</p>
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
          <CheckStatusButton status={room.status}>
            {room.status}
          </CheckStatusButton>
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
        </ContainerDetail>
      </ContainerColumn>
    </ContainerPage>
  );
}
