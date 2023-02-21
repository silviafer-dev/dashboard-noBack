export const GetFullDate = ({ date }) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let newDate = date.split("-");

  let month = months[Number(newDate[1]) - 1];
  return (
    <p style={{ fontSize: "14px", fontWeight: "600" }}>
      {month} {newDate[2]}th, {newDate[0]}
    </p>
  );
};
