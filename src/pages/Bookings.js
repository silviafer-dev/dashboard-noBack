import * as React from "react";
import { useMemo, useEffect, useState } from "react";

import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import { Pagination } from "../components/pagination";
import { InputSearch, LinkList } from "../styles/style";

import {
  ContainerColumn,
  ContainerFilter,
  ContainerPage,
  Table,
} from "../styles/containers";
import { Date, Id, TrHead, TRow, UserName } from "../styles/style";
import {
  Button,
  LightButton,
  SelectButton,
  ViewNotesButton,
} from "../styles/style-buttons";
import { AddBooking } from "../features/bookings/AddBooking";

import {
  fetchBookings,
  removeBooking,
  selectState,
} from "../features/bookings/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../hooks/useSearch";
import { SearchIcon } from "../styles/icons";

let PageSize = 10;

export function Bookings({ open, setOpen }) {
  const bookings = useSelector(selectState);
  const dispatch = useDispatch();
  const [roomState, setRoomState] = useState([]);
  const [orderBy, setOrderBy] = useState("full_name");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { searchResults, searchBooking, handleChange } = useSearch(roomState);
  useEffect(() => {
    document.title = "HMiranda | Bookings";
  }, []);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const orderedRooms = bookings.filter((room) => room[orderBy]);
    orderedRooms.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      } else if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    });
    setRoomState(orderedRooms);
  }, [bookings, orderBy]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (searchResults.length > 0) {
      return searchResults;
    } else {
      return roomState.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, roomState, searchResults]);

  const handleRemove = (id) => {
    dispatch(removeBooking(id));
  };

  return (
    <ContainerPage>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Bookings" open={open} setOpen={setOpen} />
        <ContainerFilter>
          <div>
            <SelectButton
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="full_name">Guest</option>
              <option value="order_date">Order Date</option>
              <option value="check_in">Check In</option>
              <option value="check_out">Check Out</option>
            </SelectButton>
            <AddBooking openModal={openModal} handleClose={handleClose} />
            <LightButton onClick={handleOpen}>Add New Booking</LightButton>
          </div>
          <div style={{ position: "relative" }}>
            <InputSearch
              type="text"
              placeholder="Search for guest name..."
              value={searchBooking}
              onChange={handleChange}
            />
            <SearchIcon />
          </div>
        </ContainerFilter>
        <Table>
          <thead>
            <TrHead>
              <th
                style={{
                  width: "200px",
                  borderTopLeftRadius: "20px",
                  padding: "20px",
                }}
              >
                Guest
              </th>
              <th>Order Date</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Special Request</th>
              <th>Room Type</th>
              <th>Status</th>
              <th
                style={{
                  borderTopRightRadius: "20px",
                  padding: "20px",
                  width: "40px",
                }}
              ></th>
            </TrHead>
          </thead>
          <tbody>
            {currentTableData.map((booking) => (
              <TRow key={booking.id}>
                <td style={{ padding: "20px" }}>
                  <LinkList to={`/bookings/${booking.id}`}>
                    <UserName>{booking.full_name}</UserName>
                    <Id>{booking.id}</Id>
                  </LinkList>
                </td>

                <Date>{booking.order_date}</Date>

                <Date>{booking.check_in}</Date>

                <Date>{booking.check_out}</Date>

                <td>
                  <ViewNotesButton>View Notes</ViewNotesButton>
                </td>
                <Date>
                  <div>
                    {booking.room_type}
                    <span>- {booking.room_number}</span>
                  </div>
                </Date>

                <td>
                  <Button status={booking.status}>{booking.status}</Button>
                </td>
                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(booking.id);
                    }}
                  >
                    🗑️
                  </div>
                </td>
              </TRow>
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalCount={roomState.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ContainerColumn>
    </ContainerPage>
  );
}
