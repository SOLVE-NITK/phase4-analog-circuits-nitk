const URLS = [
  {
    name: "Analysis of RC Phase Shift Oscillators using Transistors",
    url: "assets/transistors/index.html",
  },
  {
    name: "Analysis of Single Tuned Voltage Amplifier",
    url: "assets/voltage-amplifier/index.html",
  },

  {
    name: "Study of Class A Power Amplifier",
    url: "assets/classa/index.html",
  },
  {
    name: "Study of Class B Power Amplifier",
    url: "assets/classb/index.html",
  },
  // {
  //   name: "Familiarization of Hartley Oscillator",
  //   url: "assets/hartley/index.html",
  // },
  {
    name: "Familiarization of Colpitts Oscillator",
    url: "assets/colpitts/index.html",
  },
  {
    name: "Design and Analysis of Bistable Multivibrator",
    url: "assets/bistable/index.html",
  },
  {
    name: "Design and Analysis of Monostable Multivibrator",
    url: "assets/monostable/index.html",
  },
];

function displayExperiment(element) {
  console.log(element.textContent.trim());
  URLS.map((ele) => {
    if (ele.name == element.textContent.trim()) {
      document.getElementById("frame").src = ele.url;
    }
  });
}
