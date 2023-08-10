const currentTimeElement = document.getElementById("current-time");

function updateCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  let amOrPm = hours >= 12 ? "PM" : "AM";
  let twelveHourFormat = hours % 12 || 12;

  const currentTimeString = `${twelveHourFormat}:${minutes}:${seconds} ${amOrPm}`;
  currentTimeElement.textContent = currentTimeString;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPage() {
  let tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.2,
      ease: Expo.easeInOut,
      stagger: 0.3,
      delay: -1,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.2,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

function circleSkew() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    xprev = dets.clientX;
    yprev = dets.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    mouseFollower(xscale, yscale);
  });
}

function mouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

mouseFollower();
firstPage();
circleSkew();

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    let diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});
