// console.log(parseInt(screen.height) * 2);
// console.log(parseInt(document.body.scrollHeight));
(() => {
  // Only add on longer screens
  if (((parseInt(screen.height) * 2)) > parseInt(document.body.scrollHeight)) return;
  const htmlString = `<div style="box-sizing: border-box;
  position: absolute;
  top: 0rem;
  right: 2rem;
  bottom: 0;
  height: calc( ${document.body.scrollHeight}px - var(--ians-lms-banner-height) - var(--ians-footer-height) );
  pointer-events: none;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; ">

  <a id="scrollTopLink" href="#" role="button" aria-label="Scroll to top" style="position: sticky;
  top: -5rem;
  width: 3rem;
  height: 3rem;
  margin-bottom: -5rem;
  transform: translateY(100vh);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: inline-block;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  pointer-events: all;
  outline: none;
  overflow: hidden;
  background: none; opacity:0.8;">
    <svg
      height="48"
      viewBox="0 0 48 48"
      width="48"
      height="48px"
      xmlns="http://www.w3.org/2000/svg"
      style="display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;"
    >
      <path id="scrolltop-bg" style="fill: #036;" d="M0 0h48v48h-48z"></path>
      <path
        id="scrolltop-arrow"
        style="transform: scale(0.66);
        transform-origin: center; fill:#fff;"
        d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"
      ></path>
      <circle
        class="progress-ring__circle"
        stroke-width="2"
        stroke="gold"
        fill="transparent"
        r="21"
        cx="24"
        cy="24"
      />
      <!-- radius = (width / 2) - (strokeWidth * 2) -->
      <!-- circumference = radius * 2 * PI -->
    </svg>
  </a>
</div>`;
  let frag = document.createRange().createContextualFragment(htmlString);
  document.body.appendChild(frag);

  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  // circle.style.strokeDashoffset = circumference;
  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  let ticking = false;

  window.addEventListener("scroll", function (e) {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    if (!ticking) {
      window.requestAnimationFrame(function () {
        setProgress(scrollPercentRounded);
        ticking = false;
      });

      ticking = true;
    }
  });

  let link = document.querySelector("#scrollTopLink");
  link.addEventListener("click", function (event) {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  setProgress(0);
})();