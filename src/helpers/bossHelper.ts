export const getCurrentDate = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth();
  const year = Number(today.getFullYear().toString().slice(2));

  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
