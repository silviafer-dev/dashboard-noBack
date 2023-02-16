import { ContainerReview, Review } from "../styles/containers";
import { StyledIconReviewGreen, StyledIconReviewRed } from "../styles/icons";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { Image } from "../styles/style-image";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  selectStateContacts,
} from "../features/contact/contactSlice";
import { useEffect, useState } from "react";
import { SliderButton } from "../styles/style-buttons";

export function ReviewsSection({ open }) {
  const contacts = useSelector(selectStateContacts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const carouselScroll = () => {
    if (currentIndex === contacts.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      carouselScroll();
    }, 2000);
    return () => clearInterval(interval);
  });
  const next = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    setCurrentIndex(currentIndex - 1);
  };
  return (
    <ContainerReview open={open}>
      <h3>Latest Review by Customers</h3>
      <div>
        {contacts.map((review) => (
          <Review
            key={review.id}
            style={{
              transform: `translate(-${currentIndex * 110}%)`,
              transition: "1s cubic-bezier(0.39, 0.575, 0.575, 1",
            }}
          >
            <p
              style={{
                width: "300px",
                height: "150px",
                overflow: "hidden",
                fontSize: "12px",
              }}
            >
              {review.comment}
            </p>

            <div>
              <Image src={review.photo} alt="avatar" />
              <div style={{ paddingLeft: "10px" }}>
                <h4 style={{ fontSize: "12px" }}>{review.customer}</h4>
                <p style={{ fontSize: "10px" }}>{review.date.slice(0, 10)}</p>
              </div>
              <div style={{ display: "flex" }}>
                <StyledIconReviewGreen icon={faCheckCircle} />
                <StyledIconReviewRed icon={faTimesCircle} />
              </div>
            </div>
          </Review>
        ))}
      </div>
      <SliderButton onClick={prev}>← Prev</SliderButton>
      <SliderButton onClick={next}>Next →</SliderButton>
    </ContainerReview>
  );
}
