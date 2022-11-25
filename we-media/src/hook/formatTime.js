function checkTime(time) {
  if(time < 10) {
    return '0' + time;
  }
  return time.toString();
}
export default function formatTime(time) {
  // let timer = time.getTime();
  // console.log(time);
  // let date = new Date(time);
  // let y = checkTime(date.getFullYear())
  // let m = checkTime(date.getMonth())
  // let d = checkTime(date.getDay())
  // return [y, m, d].join('-');
  return time.slice(0, 10);
}
