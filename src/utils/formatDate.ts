export const formatDate = (date: string | Date) => {
   const newDate = new Date(date);
   const month = newDate.toLocaleString('default', { month: 'long' });
   const day = newDate.toLocaleString('default', { day: 'numeric' });
   const year = newDate.toLocaleString('default', { year: 'numeric' });

   const formattedDate = `${month} ${day}, ${year}`;
   return formattedDate;
};
