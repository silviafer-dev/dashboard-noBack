import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import { Pagination } from "../components/pagination";
import { ReviewsSection } from "../components/ReviewsSection";
import {
  fetchContacts,
  removeContact,
  selectStateContacts,
} from "../features/contact/contactSlice";
import { ContainerColumn, ContainerPage, Table } from "../styles/containers";
import {
  Date,
  ReviewButton,
  TableTd,
  TrHead,
  TRow,
  UserName,
} from "../styles/style";

let PageSize = 5;

export function Contacts({ open, setOpen }) {
  const contacts = useSelector(selectStateContacts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "HMiranda | Contacts";
  }, []);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return contacts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, contacts]);

  const handleRemove = (id) => {
    dispatch(removeContact(id));
  };

  return (
    <ContainerPage>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Contact Reviews" open={open} setOpen={setOpen} />
        <ReviewsSection open={open} contacts={contacts} />
        <Table>
          <thead>
            <TrHead>
              <th
                style={{
                  width: "130px",
                  borderTopLeftRadius: "20px",
                  padding: "20px",
                }}
              >
                Order ID
              </th>
              <th>Date</th>
              <th>Customer</th>
              <th>Comment</th>
              <th
                style={{
                  borderTopRightRadius: "20px",
                  padding: "20px",
                }}
              >
                Action
              </th>
            </TrHead>
          </thead>
          <tbody>
            {currentTableData.map((review) => (
              <TRow key={review.id}>
                <td
                  style={{
                    padding: "20px",
                  }}
                >
                  {review.id}
                </td>
                <Date>{review.date}</Date>
                <td>
                  <UserName> {review.customer}</UserName>
                </td>

                <TableTd>{review.comment}</TableTd>

                <td>
                  <ReviewButton status="Publish">Publish</ReviewButton>
                  <ReviewButton
                    status="Archive"
                    onClick={() => {
                      handleRemove(review.id);
                    }}
                  >
                    Archive
                  </ReviewButton>
                </td>
              </TRow>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalCount={contacts.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ContainerColumn>
    </ContainerPage>
  );
}
