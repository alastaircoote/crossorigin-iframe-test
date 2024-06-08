const randomColors = [
  "hsl(357,27%,93%)",
  "hsl(7,41%,73%)",
  "hsl(121,20%,62%)",
  "hsl(236,89%,5%)",
  "hsl(29,28%,38%)",
  "hsl(210,34%,39%)",
  "hsl(107,49%,59%)",
  "hsl(17,56%,49%)",
  "hsl(153,31%,48%)",
  "hsl(161,24%,5%)",
];

document.body.style.color = randomColors[0];

if (window.top === window) {
  const iframe = document.createElement("iframe");

  const url = new URL("http://127.0.0.1/index.html");
  url.port = window.location.port;

  iframe.src = url.href;
  document.body.appendChild(iframe);
  window.addEventListener("message", function () {
    //   console.log("msg", iframe.contentDocument);
    start();
  });
} else {
  window.top.postMessage("start", "*");
  start();
}

const h1 = document.querySelector("h1");

function start() {
  setInterval(function () {
    const currentVal = parseInt(h1.innerText, 10);
    let newVal = currentVal + 1;
    if (newVal === 10) {
      newVal = 0;
    }
    h1.innerText = newVal;
    document.body.style.color = randomColors[newVal];

    if (newVal === 6 && window.top !== window) {
      //   while (true) {
      //     // deliberately freeze
      //   }
    }
  }, 1000);
}
