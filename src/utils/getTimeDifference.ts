export const getTimeDifferenceString = (timeDifference: number): string => {
   const seconds = Math.floor(timeDifference / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);
   const weeks = Math.floor(days / 7);
   const months = Math.floor(days / 30);

   if (months === 1) {
      return `${months} month ago`;
   } else if (months > 1) {
      return `${months} months ago`;
   } else if (weeks === 1) {
      return `${weeks} week ago`;
   } else if (weeks > 1) {
      return `${weeks} weeks ago`;
   } else if (days === 1) {
      return `${days} day ago`;
   } else if (days > 1) {
      return `${days} days ago`;
   } else if (hours === 1) {
      return `${hours} hour ago`;
   } else if (hours > 1) {
      return `${hours} hours ago`;
   } else if (minutes === 1) {
      return `${minutes} minute ago`;
   } else if (minutes > 1) {
      return `${minutes} minutes ago`;
   } else if (seconds === 1) {
      return `${seconds} second ago`;
   } else {
      return `${seconds} seconds ago`;
   }
};
