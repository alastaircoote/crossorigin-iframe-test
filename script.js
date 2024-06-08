const h1 = document.querySelector("h1");
const select = document.querySelector("select");
const freeze = document.querySelector("#freeze");
const dateFormatter = new Intl.DateTimeFormat("en-US", { timeStyle: "medium" });

if (window.top === window) {
  const iframe = document.createElement("iframe");
  document.querySelector("#iframe-target").appendChild(iframe);

  select.addEventListener("change", function (e) {
    const targetURL = new URL(location.href);
    if (select.value === "cross-origin") {
      if (targetURL.hostname === "localhost") {
        targetURL.hostname = "127.0.0.1";
      } else {
        targetURL.hostname = "cross-origin-iframe-test.alastair.is";
      }
    }

    iframe.src = targetURL.href;
  });

  select.dispatchEvent(new CustomEvent("change"));
}

freeze.addEventListener("click", function () {
  // deliberately freeze
  setTimeout(function () {
    while (true) {}
  }, 1000);
});

function setTime() {
  h1.innerText = dateFormatter.format(Date.now());
}

const rightNow = Date.now();

const untilNextSecond = rightNow % 1000;
setTimeout(function () {
  setTime();
  setInterval(setTime, 1000);
}, 1000 - untilNextSecond);

// if (window.top !== window) {
//   setTimeout(function () {
//     while (true) {}
//   }, 5000);
// }

setTime();
