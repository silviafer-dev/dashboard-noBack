import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import { Pagination } from "../components/pagination";
import { LinkList, NumberTd, StateUser, TableTd } from "../styles/style";

import { ContainerColumn, ContainerPage, Table } from "../styles/containers";
import { Id, TrHead, TRow, UserName } from "../styles/style";
import { LightButton } from "../styles/style-buttons";

import {
  fetchUsers,
  removeUser,
  selectStateUsers,
} from "../features/users/usersSlice";
import { Image } from "../styles/style-image";
import { AddUser } from "../features/users/AddUser";

let PageSize = 10;

export function Users({ open, setOpen }) {
  const users = useSelector(selectStateUsers);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.title = "HMiranda | Users";
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  const handleRemove = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <ContainerPage>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Users List" open={open} setOpen={setOpen} />
        <div>
          <AddUser openModal={openModal} handleClose={handleClose} />
          <LightButton onClick={handleOpen}>Add New User</LightButton>
        </div>
        <Table>
          <thead>
            <TrHead>
              <th
                style={{
                  width: "105px",
                  borderTopLeftRadius: "20px",
                  padding: "20px",
                }}
              >
                Photo
              </th>
              <th
                style={{
                  width: "110px",
                }}
              >
                User
              </th>
              <th
                style={{
                  width: "100px",
                }}
              >
                Job
              </th>
              <th
                style={{
                  width: "180px",
                }}
              >
                Email
              </th>
              <th
                style={{
                  width: "120px",
                }}
              >
                Phone
              </th>
              <th
                style={{
                  width: "120px",
                }}
              >
                Start Date
              </th>
              <th
                style={{
                  width: "120px",
                }}
              >
                Functions
              </th>
              <th
                style={{
                  width: "80px",
                }}
              >
                Status
              </th>
              <th
                style={{
                  borderTopRightRadius: "20px",
                  padding: "10px",
                  width: "40px",
                }}
              ></th>
            </TrHead>
          </thead>
          <tbody>
            {currentTableData.map((user) => (
              <TRow key={user.id}>
                <td
                  style={{
                    padding: "20px",
                  }}
                >
                  <LinkList to={`/users/${user.id}`}>
                    <Image src={user.photo} alt="" />
                  </LinkList>
                </td>
                <td>
                  <LinkList to={`/users/${user.id}`}>
                    <UserName style={{ padding: "0" }}>
                      {user.full_name}
                    </UserName>
                    <Id>{user.id}</Id>
                  </LinkList>
                </td>
                <td style={{ fontSize: "12px" }}>{user.job_title}</td>
                <TableTd>{user.email}</TableTd>
                <NumberTd>
                  <span>????</span>
                  {user.phone_number}
                </NumberTd>
                <NumberTd>{user.start_date}</NumberTd>
                <TableTd>{user.working_functions}</TableTd>
                <StateUser status={user.working_situation}>
                  {user.working_situation}
                </StateUser>

                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(user.id);
                    }}
                  >
                    ???????
                  </div>
                </td>
              </TRow>
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ContainerColumn>
    </ContainerPage>
  );
}
