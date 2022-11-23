function checkTime(time) {
  if(time < 10) {
    return '0' + time;
  }
  return time.toString();
}
export default function formatTime(timer) {
  let date = new Date(timer);
  let y = checkTime(date.getFullYear())
  let m = checkTime(date.getMonth())
  let d = checkTime(date.getDay())
  return [y, m, d].join('-');
}