//时间戳转换成日期时间
function js_date_time(unixtime) {
  var date = new Date(unixtime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute;

}

/**
 * 当前时间
 */
function current_time() {
  var date = new Date(); //创建时间对象     
  var year = date.getFullYear();
  //获取年     
  var month = date.getMonth() + 1; //获取月   
  var day = date.getDate(); //获取日     
  var hour = date.getHours(); //获取时    
  var minute = date.getMinutes(); //获取分    
  var second = date.getSeconds(); //获取秒   
  var time = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`; //当前时间
  return time;
}

module.exports = {
  js_date_time: js_date_time,
  current_time: current_time
}