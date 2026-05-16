export const formatDate = (value) => {
  if (!value) return "Today";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default formatDate;
