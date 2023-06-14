export default function formatTime(timestamp: string) {
   const date = new Date(timestamp);

   // Extracting the time components
   let hours = date.getHours();
   const minutes = date.getMinutes();
   const meridiem = hours >= 12 ? 'pm' : 'am';

   // Convert hours to 12-hour format
   hours = hours % 12 || 12;

   // Formatting the time as "H:MM meridiem"
   const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;

   return formattedTime;
}
