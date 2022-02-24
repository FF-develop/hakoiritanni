let ua = window.navigator.userAgent;

if(ua.indexOf('Edge') != -1 || ua.indexOf('Edg') != -1) {
  console.log('Microsoft Edge');
} else if(ua.indexOf('Trident') != -1 || ua.indexOf('MSIE') != -1) {
  console.log('Microsoft Internet Explorer');
  location.href = "./error.html";
} else if(ua.indexOf('OPR') != -1 || ua.indexOf('Opera') != -1) {
  console.log('Opera');
  location.href = "./error.html";
} else if(ua.indexOf('Chrome') != -1) {
  console.log('Google Chrome');
} else if(ua.indexOf('Firefox') != -1) {
  console.log('FireFox');
  location.href = "./error.html";
} else if(ua.indexOf('Safari') != -1) {
  console.log('Safari');
  location.href = "./error.html";
} else if(ua.indexOf('Safari') != -1) {
  console.log('Safari');
  location.href = "./error.html";
}else {
  console.log('Unknown');
  location.href = "./error.html";
}