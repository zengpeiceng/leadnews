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

  let hh = checkTime(date.getHours())
  let mm = checkTime(date.getMinutes());
  let ss = checkTime(date.getSeconds());
  return [y, m, d].join('-') + ' '+ [hh, mm, ss].join(':');
}