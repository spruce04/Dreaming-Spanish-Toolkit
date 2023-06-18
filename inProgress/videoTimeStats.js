const allVids = document.getElementsByClassName("ds-badge ds-badge--sm ds-badge--gray-80 ds-video-thumbnail__badge ds-video-thumbnail__badge--duration");
let body = document.getElementsByTagName("body");
body.style = ""
console.log(allVids.length);
console.log(allVids[0].textContent);
window.scrollBy(0, 1000);