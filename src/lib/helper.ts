export function printDate(d: Date): string {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Get specific information that you need from new Date(). 
  const weekDay = days[d.getDay()]; 
  const monthDay = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  //Here weekDay + monthDay + month + year (Monday, 13 july 2020).
  return weekDay + ", " + monthDay + " " + month + " " + year;
}