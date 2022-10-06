document.querySelectorAll(".ians-syllabus a").forEach(link => {
  link.addEventListener("click", function (event) {
    parent.postMessage("linkClicked", parent);
  });
});

parent.postMessage("syllabusLoaded", parent);

if (sessionStorage.getItem('da-scroll')) {
  scroll(0, sessionStorage.getItem('da-scroll'));
}

document.addEventListener("scroll", (event) => {
  sessionStorage.setItem('da-scroll', scrollY);
});