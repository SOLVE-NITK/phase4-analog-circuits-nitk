// NEWLY MODIFIED

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var resetclicked = false;
// new dot
const circuitComponents = document.querySelectorAll(".circuit-component");
let connecting = false;
let startComponent = null;
let maxLines = 2; // Maximum number of lines allowed
let curves = [];

var abc = true;
document.getElementById("check-button").disabled = true;

// Function to create a Bezier curve path between two components
function createCurvePath(startX, startY, endX, endY) {
  const controlPointX = (startX + endX) / 2;
  const controlPointY = startY - 30; // Adjust this value for the curve shape

  return `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
}

function updateButtonState() {
  const checkButton = document.getElementById("check-button");
  if (curves.length === 2) {
    checkButton.disabled = false;
  } else {
    checkButton.disabled = true;
  }
}
// Updated function to enable/disable the "Check" button based on connections

// Event listener for circuit components
circuitComponents.forEach((component) => {
  component.addEventListener("click", () => {
    if (!connecting) {
      startComponent = component;
      connecting = true;
    } else {
      // Check if the connection is not between c1 and c3 or c4 and c2 in either direction

      if (
        ((startComponent.id.includes("2") ||
          startComponent.id.includes("3") ||
          startComponent.id.includes("5") ||
          startComponent.id.includes("7")) &&
          (component.id.includes("2") ||
            component.id.includes("3") ||
            component.id.includes("5") ||
            component.id.includes("7"))) ||
        ((startComponent.id.includes("1") ||
          startComponent.id.includes("4") ||
          startComponent.id.includes("6") ||
          startComponent.id.includes("8")) &&
          (component.id.includes("1") ||
            component.id.includes("4") ||
            component.id.includes("6") ||
            component.id.includes("8")))
      ) {
        abc = false;
      } else {
        abc = true;
      }
      if (
        !(
          (startComponent === c1 && component === c3) ||
          (startComponent === c3 && component === c1) ||
          (startComponent === c4 && component === c2) ||
          (startComponent === c2 && component === c4)
        )
      ) {
        const svg = document.getElementById("circuit-svg");

        // Create a Bezier curve path
        const curvePath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        curvePath.setAttribute("class", "connector-curve");

        const startX = parseFloat(startComponent.getAttribute("cx"));
        const startY = parseFloat(startComponent.getAttribute("cy"));
        const endX = parseFloat(component.getAttribute("cx"));
        const endY = parseFloat(component.getAttribute("cy"));

        curvePath.setAttribute(
          "d",
          createCurvePath(startX, startY, endX, endY)
        );

        // Check if the number of curves exceeds the maximum allowed
        if (curves.length >= maxLines) {
          // Remove the oldest curve from the SVG and the curves array
          svg.removeChild(curves[0]);
          curves.shift(); // Remove the first (oldest) curve
        }

        if (
          startComponent.id.includes("3") ||
          startComponent.id.includes("4") ||
          startComponent.id.includes("7") ||
          component.id.includes("8") ||
          component.id.includes("3") ||
          component.id.includes("4") ||
          component.id.includes("7") ||
          component.id.includes("8")
        ) {
          curvePath.setAttribute("stroke", "black"); // Set the line color to black for black components
        } else {
          curvePath.setAttribute("stroke", "red"); // Set the line color to red for other connections
        }

        // Add the new curve to the list of curves
        curves.push(curvePath);
        svg.appendChild(curvePath);
      }

      connecting = false;
      startComponent = null;

      // Update button state after creating a connection
      updateButtonState();
    }
  });
});

function hasIntersections() {
  for (let i = 0; i < curves.length; i++) {
    for (let j = 0; j < curves.length; j++) {
      if (i !== j) {
        const curve1 = curves[i];
        const curve2 = curves[j];

        // Get the bounding boxes of the curves
        const boundingBox1 = curve1.getBBox();
        const boundingBox2 = curve2.getBBox();

        // Check if the bounding boxes overlap
        if (
          boundingBox1.x < boundingBox2.x + boundingBox2.width &&
          boundingBox1.x + boundingBox1.width > boundingBox2.x &&
          boundingBox1.y < boundingBox2.y + boundingBox2.height &&
          boundingBox1.y + boundingBox1.height > boundingBox2.y
        ) {
          return true;
          // Overlapping bounding boxes, curves intersect
        }
      }
    }
  }
  return false; // No intersections found
}

function countConnections() {
  const numberOfConnections = curves.length;

  // Check if the number of connections is not equal to 4
  if (hasIntersections()) {
    // Check for intersections
    alert("Wrong Connection ");
    const checkButton = document.getElementById("check-button");
    checkButton.disabled = true;
    notify.innerHTML = "Complete Connection";
    varinit();
    document.getElementById("sim").disabled = true;
  } else {
    if (abc) {
      alert("Right Connection!!!");
      notify.innerHTML = "Provide initial values";
    } else {
      alert("Wrong Connection ");
      const checkButton = document.getElementById("check-button");
      checkButton.disabled = true;
      notify.innerHTML = "Complete Connection";
      varinit();
      document.getElementById("sim").disabled = true;
    }
  }
}
function inputEnable() {
  $("#freqSlider").slider("enable");
  $("#freqSpinner").spinner("enable");
  $("#ampSlider").slider("enable");
  $("#ampSpinner").spinner("enable");
  document.getElementById("sim").disabled = false;
  notify.innerHTML = "Provide Initial Values";
  countConnections();
}
document.getElementById("sim").disabled = true;

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  resetclicked = false;
  const frequencyDisplay = document.getElementById("result");
  frequencyDisplay.style.display = "none";

  // Clear all connector lines and reset the state
  curves.forEach((line) => {
    line.remove();
  });
  curves = [];
  document.getElementById("check-button").disabled = true;
  document.getElementById("sim").disabled = true;
  document.getElementById("red-block").disabled = true;
  $("#resSlider").slider("disable");
  $("#resSpinner").spinner("disable");
  notify.innerHTML = "Reset the circuit connection";
  // let cansimulate=false;
});

function varinit() {
  varchange();

  $("#resSlider").slider("value", 2);
  $("#resSlider").slider("disable");

  $("#resSpinner").spinner("value", 2);
  $("#resSpinner").spinner("disable");
}
function varchange() {
  //0
  $("#resSlider").slider({ max: 600, min: 0, step: 10 });
  $("#resSpinner").spinner({ max: 600, min: 0, step: 10 });

  $("#resSlider").on("slide", function (e, ui) {
    $("#freqSpinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#resSpinner").on("spin", function (e, ui) {
    $("#resSlider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  // $("#resSpinner").on("change", function () {
  //   varchange();
  // });
  // $("#resSpinner").on("touch-start", function () {
  //   varchange();
  // });
}
function varupdate() {
  $("#resSpinner").spinner("value", $("#resSlider").slider("value"));

  const frequency = $("#resSpinner").spinner("value");
}

//popup
document.getElementById("check-button").disabled = true;

function inputEnable() {
  $("#resSlider").slider("enable");
  $("#resSpinner").spinner("enable");
  document.getElementById("sim").disabled = false;
  notify.innerHTML = "Provide Initial Values";
  countConnections();
}
function simulate() {
  notify.innerHTML = "Click on the CRO to view the output wave";
  const redBlock = document.getElementById("red-block");
  redBlock.addEventListener("click", sim);
  resetclicked = true;
}

function sim() {
  if (resetclicked) {
    const popup = document.getElementById("popup");
    const plotContainer = document.getElementById("plot-container");

    // FIRST GRAPH
    const voltage = parseFloat(document.getElementById("resSpinner").value);
    if(voltage==0){

      alert("Input Resistance and then click on simulate ");
    }else{
    // Constants
    const C = 1e-9; // 1nF
    const Rc = 3.3e3; // 3.3k ohms

    // Calculate K and frequency (f)
    const K = Rc / voltage;
    const calculatedFrequency =
      1 / (2 * Math.PI * voltage * C * Math.sqrt(6 + 4 * K));
    const T = 1 / calculatedFrequency;
    const numPoints = 500;
    const timeArray = new Array(numPoints)
      .fill()
      .map((_, i) => (i * T) / numPoints);
    const sineWave = timeArray.map((t) =>
      Math.sin(2 * Math.PI * calculatedFrequency * t)
    );

    // display the calculated frequency
    const frequencyDisplay = document.getElementById("result");
    frequencyDisplay.textContent =
      "Frequency (f) :" + calculatedFrequency.toFixed(2) + " Hz";
    // Create the layout for the plot

    const config = {
      modeBarButtonsToRemove: [
        "zoom2d",
        "pan2d",
        "select2d",
        "lasso2d",
        "resetScale2d",
        "autoScale2d",
        "compareDataOnHover",
        "toggleSpikelines",
      ],
    };

    // Plot the sine wave
    Plotly.newPlot(
      plotContainer,
      [
        {
          x: timeArray,
          y: sineWave,
          type: "scatter",
          mode: "lines",
          name: "Sine Wave",
        },
      ],
      {
        xaxis: {
          title: "Time (s)",
        },
        yaxis: {
          title: "Amplitude",
        },
        title: `Sine Wave with Frequency ${calculatedFrequency.toFixed(2)} Hz`,
      },
      config
    );
    // });

    //  FIRST GRAPH ENDING
  
    popup.style.display = "block";
    }
  }
}

function closePopup() {
  popup.style.display = "none";
  // document.getElementById("att").disabled = false;
}

//popup end

const canva = document.getElementById("canvas");
canva.style.display = "none";
// const canvad=document.getElementById("canvas__div");
// canvad.style.display="none";
const canvac = document.getElementById("canvas-container");
canvac.style.display = "none";

notify.innerHTML = "Complete the connection";

window.addEventListener("load", varinit);
