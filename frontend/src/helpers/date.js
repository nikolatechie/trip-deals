export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const sanitiseDateTime = (dateTime) => {
  const split = dateTime.split(" ");
  return split.slice(0, 4).join(" ") + " at " + split[4].substr(0, 5);
};
