import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import { UpdateUser } from "../features/users/UpdateUser";
import {
  fetchUser,
  removeUser,
  selectStateDetail,
} from "../features/users/usersSlice";
import { ContainerColumn, ContainerPage } from "../styles/containers";
import {
  ContainerDetail,
  ItemsDetail,
  LinkDetail,
  PhotoDetail,
  RoomBlock,
  StatusUserDetail,
  TitleDetail,
} from "../styles/detail-page";
import { IconDelete, IconEdit } from "../styles/icons";

export function User({ open, setOpen }) {
  const { id } = useParams();

  const user = useSelector(selectStateDetail);
  const [edit, setEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  const handleRemove = () => {
    dispatch(removeUser(id));
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
        <Nav title="User Detail" open={open} setOpen={setOpen} />
        <ContainerDetail>
          <LinkDetail to="/users">
            <IoIosArrowRoundBack style={{ fontSize: "60px" }} />
          </LinkDetail>
          <RoomBlock>
            <PhotoDetail src={user.photo} alt="" />
            <div>
              <ItemsDetail>Full Name </ItemsDetail>
              <TitleDetail>{user.full_name}</TitleDetail>
              <ItemsDetail>Work Position </ItemsDetail>
              <h4>{user.job_title}</h4>
            </div>
          </RoomBlock>
          <ItemsDetail>Email </ItemsDetail>
          <p>{user.email}</p>
          <ItemsDetail>Phone Number </ItemsDetail>
          <p>{user.phone_number}</p>
          <ItemsDetail>Start Date </ItemsDetail>
          <p>{user.start_date}</p>
          <ItemsDetail>Description </ItemsDetail>
          <p>{user.working_functions}</p>

          <ItemsDetail>Status </ItemsDetail>
          <StatusUserDetail status={user.working_situation}>
            {user.working_situation}
          </StatusUserDetail>
          <div>
            <IconEdit
              onClick={() => {
                handleOpen(user);
              }}
            />
            <IconDelete
              onClick={() => {
                handleRemove(user._id);
                navigate(-1);
              }}
            />

            <UpdateUser
              openModal={openModal}
              user={user}
              edit={edit}
              handleClose={handleClose}
            />
          </div>
        </ContainerDetail>
      </ContainerColumn>
    </ContainerPage>
  );
}
