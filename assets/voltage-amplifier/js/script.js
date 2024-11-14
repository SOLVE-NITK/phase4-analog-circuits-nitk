// NEWLY MODIFIED

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var resetclicked = false;
let valueCount = 0;
// clicking cro generates a pop up window

// dots
// const circuitComponents = document.querySelectorAll(".circuit-component");
//       let connecting = false;
//       let startComponent = null;
//       let maxLines = 4; // Maximum number of lines allowed
//       let lines = [];

//       // Function to check for intersection between two lines
//       function doLinesIntersect(line1, line2) {
//         const x1 = parseFloat(line1.getAttribute("x1"));
//         const y1 = parseFloat(line1.getAttribute("y1"));
//         const x2 = parseFloat(line1.getAttribute("x2"));
//         const y2 = parseFloat(line1.getAttribute("y2"));

//         const x3 = parseFloat(line2.getAttribute("x1"));
//         const y3 = parseFloat(line2.getAttribute("y1"));
//         const x4 = parseFloat(line2.getAttribute("x2"));
//         const y4 = parseFloat(line2.getAttribute("y2"));

//         const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

//         if (det === 0) {
//           return false; // Lines are parallel
//         } else {
//           const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
//           const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det;

//           return t >= 0 && t <= 1 && u >= 0 && u <= 1;
//         }
//       }

//       // Function to check if there are any intersections among connector lines
//       function hasIntersections() {
//         for (let i = 0; i < lines.length - 1; i++) {
//           for (let j = i + 1; j < lines.length; j++) {
//             if (doLinesIntersect(lines[i], lines[j])) {
//               return true; // Intersection found
//             }
//           }
//         }
//         return false; // No intersections found
//       }

//       // Function to check if all required connections are present
//       function checkConnections() {
//         const requiredConnections = [
//           { from: "c1", to: "c2" },
//           { from: "c3", to: "c4" },
//           { from: "c5", to: "c6" },
//           { from: "c7", to: "c8" },
//         ];

//         let connectedCount = 0;

//         for (const connection of requiredConnections) {
//           const fromComponent = document.getElementById(connection.from);
//           const toComponent = document.getElementById(connection.to);

//           // If both components exist, increment the connectedCount
//           if (fromComponent && toComponent) {
//             connectedCount++;
//           }
//         }

//         return connectedCount === 4 && !hasIntersections();
//       }

//       // Updated function to enable/disable the "Check" button based on connections
//       function updateButtonState() {
//         const checkButton = document.getElementById("check-button");
//         checkButton.disabled = !checkConnections();
//         if(lines.length!==4){
//           checkButton.disabled=true;
//         }
//       }

//       // Event listener for circuit components
//       circuitComponents.forEach((component) => {
//         component.addEventListener("click", () => {
//           if (!connecting) {
//             startComponent = component;
//             connecting = true;
//           } else {
//             // Check if the connection is not between c1 and c3 or c4 and c2 in either direction
//             if (
//               !(
//                 (startComponent === c1 && component === c3) ||
//                 (startComponent === c3 && component === c1) ||
//                 (startComponent === c4 && component === c2) ||
//                 (startComponent === c2 && component === c4)
//               )
//             ) {
//               const svg = document.getElementById("circuit-svg");
//               const connectorLine = document.createElementNS(
//                 "http://www.w3.org/2000/svg",
//                 "line"
//               );
//               connectorLine.setAttribute("class", "connector-line");
//               connectorLine.setAttribute(
//                 "x1",
//                 startComponent.getAttribute("cx")
//               );
//               connectorLine.setAttribute(
//                 "y1",
//                 startComponent.getAttribute("cy")
//               );
//               connectorLine.setAttribute("x2", component.getAttribute("cx"));
//               connectorLine.setAttribute("y2", component.getAttribute("cy"));
//               if (
//                 startComponent.id.includes("3") ||
//                 startComponent.id.includes("4") ||
//                 startComponent.id.includes("7") ||
//                 component.id.includes("8") ||
//                 component.id.includes("3") ||
//                 component.id.includes("4") ||
//                 component.id.includes("7") ||
//                 component.id.includes("8")
//               ) {
//                 connectorLine.setAttribute("stroke", "black"); // Set the line color to black for black components
//               } else {
//                 connectorLine.setAttribute("stroke", "red"); // Set the line color to red for other connections
//               }
//               // Add the new line to the list of lines
//               lines.push(connectorLine);

//               // Check if the number of lines exceeds the maximum allowed
//               if (lines.length > maxLines) {
//                 // Remove the oldest line from the SVG and the lines array
//                 svg.removeChild(lines[0]);
//                 lines.shift(); // Remove the first (oldest) line
//               }

//               svg.appendChild(connectorLine);
//             }

//             connecting = false;
//             startComponent = null;

//             // Update button state after creating a connection
//             updateButtonState();
//           }
//         });
//       });
//     function reset()
//     {
//       const resetButton = document.getElementById("reset-button");
//       resetButton.addEventListener("click", () => {
//         // Clear all connector lines and reset the state
//         lines.forEach((line) => {
//           line.remove();
//         });
//         lines = [];
//         document.getElementById("check-button").disabled = true;
//         document.getElementById("sim").disabled=true;
// document.getElementById("att").disabled=true;
// document.getElementById("red-block1").disabled=true;
//       });
//     }
// d1 end

// new dot
const circuitComponents = document.querySelectorAll(".circuit-component");
let connecting = false;
let startComponent = null;
let maxLines = 4; // Maximum number of lines allowed
let curves = [];

// Function to create a Bezier curve path between two components
function createCurvePath(startX, startY, endX, endY) {
  const controlPointX = (startX + endX) / 2;
  const controlPointY = startY - 30; // Adjust this value for the curve shape

  return `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
}

// Function to check if all required connections are present
// function checkConnections() {
//   const requiredConnections = [
//     { from: "c1", to: "c2" },
//     { from: "c3", to: "c4" },
//     { from: "c5", to: "c6" },
//     { from: "c7", to: "c8" },
//   ];

//   let connectedCount = 0;

//   for (const connection of requiredConnections) {
//     const fromComponent = document.getElementById(connection.from);
//     const toComponent = document.getElementById(connection.to);

//     // If both components exist, increment the connectedCount
//     if (fromComponent && toComponent) {
//       connectedCount++;
//     }
//   }

//   return connectedCount === 4;
// }

function updateButtonState() {
  const checkButton = document.getElementById("check-button");
  if (curves.length === 4) {
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
        !(
          (startComponent === c1 && component === c3) ||
          (startComponent === c3 && component === c1) ||
          (startComponent === c4 && component === c2) ||
          (startComponent === c2 && component === c4) ||
          (startComponent === c2 && component === c5) ||
          (startComponent === c5 && component === c2) ||
          (startComponent === c6 && component === c1) ||
          (startComponent === c1 && component === c6) ||
          (startComponent === c8 && component === c6) ||
          (startComponent === c6 && component === c8) ||
          (startComponent === c7 && component === c5) ||
          (startComponent === c5 && component === c7)
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
// function doCurvesIntersect(curve1, curve2) {
//   // For simplicity, we assume no intersections in this example
//   return false;
// }
// function hasIntersections() {
//   for (let i = 0; i < curves.length; i++) {
//     for (let j = i + 1; j < curves.length; j++) {
//       // Get the two curve elements to check for intersection
//       const curve1 = curves[i];
//       const curve2 = curves[j];

//       // Check if the two curves intersect
//       if (doCurvesIntersect(curve1, curve2)) {
//         return true; // Intersections found
//       }
//     }
//   }
//   return false; // No intersections found
// }

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
          return true; // Overlapping bounding boxes, curves intersect
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
    notify.innerHTML =
      "Complete the connection and click on check button to check for the correctness of connection";
    varinit();
    document.getElementById("sim").disabled = true;
  } else {
    alert("Right Connection!!!");
    notify.innerHTML = "Provide initial values";
  }
}

// Function to check for intersections between curves

// Function to check if two curves intersect

// new dot end
document.getElementById("sim").disabled = true;
document.getElementById("att").disabled = true;
document.getElementById("red-block1").disabled = true;

// var checkButton = document.getElementById("checkButton");
//       const component1 = document.getElementById("component1");
//       const component2 = document.getElementById("component2");
//       const connectorLine = document.getElementById("connector-line");

//       const component3 = document.getElementById("component3");
//       const component4 = document.getElementById("component4");
//       const connectorLine1 = document.getElementById("connector-line1");

//       let connecting1 = false;
//       let connecting2 = false;

//       component1.addEventListener("click", () => {
//         if (!connecting1) {
//           connectorLine.setAttribute("x1", component1.getAttribute("cx"));
//           connectorLine.setAttribute("y1", component1.getAttribute("cy"));
//           connecting1 = true;
//         } else {
//           connectorLine.setAttribute("x2", component1.getAttribute("cx"));
//           connectorLine.setAttribute("y2", component1.getAttribute("cy"));
//           connectorLine.style.display = "block";
//         }
//       });

//       component2.addEventListener("click", () => {
//         if (!connecting1) {
//           connectorLine.setAttribute("x1", component2.getAttribute("cx"));
//           connectorLine.setAttribute("y1", component2.getAttribute("cy"));
//           connecting1 = true;
//         } else {
//           connectorLine.setAttribute("x2", component2.getAttribute("cx"));
//           connectorLine.setAttribute("y2", component2.getAttribute("cy"));
//           connectorLine.style.display = "block";
//         }
//       });

//       component3.addEventListener("click", () => {
//         if (!connecting2) {
//           connectorLine1.setAttribute("x1", component3.getAttribute("cx"));
//           connectorLine1.setAttribute("y1", component3.getAttribute("cy"));
//           connecting2 = true;
//         } else {
//           connectorLine1.setAttribute("x2", component3.getAttribute("cx"));
//           connectorLine1.setAttribute("y2", component3.getAttribute("cy"));
//           connectorLine1.style.display = "block";
//         }
//       });

//       component4.addEventListener("click", () => {
//         if (!connecting2) {
//           connectorLine1.setAttribute("x1", component4.getAttribute("cx"));
//           connectorLine1.setAttribute("y1", component4.getAttribute("cy"));
//           connecting2 = true;
//         } else {
//           connectorLine1.setAttribute("x2", component4.getAttribute("cx"));
//           connectorLine1.setAttribute("y2", component4.getAttribute("cy"));
//           connectorLine1.style.display = "block";
//         }
//       });
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  resetclicked = false;
  // Clear all connector lines and reset the state
  curves.forEach((line) => {
    line.remove();
    document.getElementById("notify").innerHTML =
      "Complete the connection and click on check button to check for the correctness of connection";

    $("#freqSlider").slider("value", 1000);
    $("#freqSpinner").spinner("value", 1000);
    $("#ampSlider").slider("value", 1);
    $("#ampSpinner").spinner("value", 1);
  });
  curves = [];
  document.getElementById("check-button").disabled = true;

  const table = document.getElementById("dataTable");
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i >= 0; i--) {
    table.deleteRow(i);
  }
  $("#ampSlider").slider("disable");
  $("#ampSpinner").spinner("disable");
  $("#freqSlider").slider("disable");
  $("#freqSpinner").spinner("disable");

  document.getElementById("sim").disabled = true;
  document.getElementById("att").disabled = true;
  document.getElementById("red-block1").disabled = true;
});

function varinit() {
  varchange();

  $("#freqSlider").slider("value", 1000);
  $("#freqSlider").slider("disable");

  $("#freqSpinner").spinner("value", 1000);
  $("#freqSpinner").spinner("disable");
  $("#ampSlider").slider("value", 1);
  $("#ampSlider").slider("disable");
  $("#ampSpinner").spinner("value", 1);
  $("#ampSpinner").spinner("disable");
}
function varchange() {
  //0
  $("#freqSlider").slider({ max: 10000, min: 1000, step: 200 });
  $("#freqSpinner").spinner({ max: 10000, min: 1000, step: 200 });

  $("#freqSlider").on("slide", function (e, ui) {
    $("#freqSpinner").spinner("value", ui.value);
    time = 0;
    // varupdate();
  });
  $("#freqSpinner").on("spin", function (e, ui) {
    $("#freqSlider").slider("value", ui.value);
    time = 0;
    //varupdate();
  });
  $("#freqSpinner").on("change", function () {
    varchange();
  });
  $("#freqSpinner").on("touch-start", function () {
    varchange();
  });
  //1
  $("#ampSlider").slider({ max: 5, min: 1, step: 1 });
  $("#ampSpinner").spinner({ max: 5, min: 1, step: 1 });

  $("#ampSlider").on("slide", function (e, ui) {
    $("#ampSpinner").spinner("value", ui.value);
    time = 0;
    // varupdate();
  });
  $("#ampSpinner").on("spin", function (e, ui) {
    $("#ampSlider").slider("value", ui.value);
    time = 0;
    // varupdate();
  });
  $("#ampSpinner").on("change", function () {
    varchange();
  });
  $("#ampSpinner").on("touch-start", function () {
    varchange();
  });
}
//function varupdate() {
// $("#freqSpinner").spinner("value", $("#freqSlider").slider("value"));
// $("#ampSpinner").spinner("value", $("#ampSlider").slider("value"));
// const frequency = $("#freqSpinner").spinner("value");
// const amplitude = $("#ampSpinner").spinner("value");
//}

//graph value computation
//  const frequency = parseFloat(document.getElementById("freqSpinner").value);
//  const vin = parseFloat(document.getElementById("ampSpinner").value);
//  const vg=100/(Math.sqrt(1+[(2770.53/frequency)-(frequency/2770.53)]*[(2770.53/frequency)-(frequency/2770.53)]))
// const vout=vg*vin;

//popup
document.getElementById("check-button").disabled = true;

function inputEnable() {
  $("#freqSlider").slider("enable");
  $("#freqSpinner").spinner("enable");
  $("#ampSlider").slider("enable");
  $("#ampSpinner").spinner("enable");
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
  if (resetclicked == true) {
    // document.getElementById("att").disabled=false;

    const redBlock = document.getElementById("red-block");
    const popup = document.getElementById("popup");
    const plotContainer = document.getElementById("plot-container");

    redBlock.addEventListener("click", openPopup);

    function openPopup() {
      if (resetclicked) {
        // const frequency = parseFloat(document.getElementById("freqSpinner").value);
        //   // const amplitude = parseFloat(document.getElementById("ampSpinner").value);
        //   const frequency = parseFloat(document.getElementById("freqSpinner").value);
        //  const vin = parseFloat(document.getElementById("ampSpinner").value);
        //  const vg=100/(Math.sqrt(1+[(2770.53/frequency)-(frequency/2770.53)]*[(2770.53/frequency)-(frequency/2770.53)]))
        // const vout=vg*vin;

        //      const xValues = [...Array(1000).keys()].map(x => x / 100);
        //      const yValues = xValues.map(x =>vout * Math.sin(2 * Math.PI * frequency * x));

        //      const data = [{ x: xValues, y: yValues, type: "scatter" }];
        //      const layout = {xaxis: { title: "Time" }, yaxis: { title: "Vin" } };

        //      Plotly.newPlot(plotContainer, data, layout);
        // FIRST GRAPH
        const voltage = parseFloat(document.getElementById("ampSpinner").value);
        const frequency = parseFloat(
          document.getElementById("freqSpinner").value
        );
        const outputVoltage = calculateOutputVoltage(frequency, voltage);
        generateSineWave(voltage, frequency);
        generateOutWave(outputVoltage, frequency);
        function generateSineWave(voltage, frequency) {
          const period = 1 / frequency; // Calculate the period
          const numPoints = 1000; // Number of points for the sine wave
          const timesteps = [];
          const sineValues = [];

          for (let i = 0; i < numPoints; i++) {
            const t = i * (period / numPoints); // Calculate time 't' from 0 to period
            const y = voltage * Math.sin(2 * Math.PI * frequency * t); // Calculate y = A * sin(2 * π * f * t)
            timesteps.push(t);
            sineValues.push(y);
          }

          // Create a Plotly trace for the sine wave
          const trace = {
            x: timesteps,
            y: sineValues,
            mode: "lines",
            name: "Sine Wave",
          };

          // Create the layout for the plot
          const layout = {
            title: "Sine Wave Generator",
            xaxis: { title: "Time (s)" },
            yaxis: { title: "Amplitude" },
          };
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
          Plotly.newPlot("plot-container", [trace], layout, config);
          notify.innerHTML = "Add the values to the table";
        }

        //  FIRST GRAPH ENDING
        // SECOND GRAPH
        // Function to calculate output voltage
        function calculateOutputVoltage(frequency, inputVoltage) {
          const voltageGain =
            100 /
            Math.sqrt(
              1 + Math.pow(2770.53 / frequency - frequency / 2770.53, 2)
            );
          return voltageGain * inputVoltage;
        }

        function generateOutWave(outputVoltage, frequency) {
          const period = 1 / frequency; // Calculate the period
          const numPoints = 1000; // Number of points for the sine wave
          const timesteps = [];
          const sineValues = [];

          for (let i = 0; i < numPoints; i++) {
            const t = i * (period / numPoints); // Calculate time 't' from 0 to period
            const y = outputVoltage * Math.sin(2 * Math.PI * frequency * t); // Calculate y = output voltage * sin(2 * π * f * t)
            timesteps.push(t);
            sineValues.push(y);
          }

          // Create a Plotly trace for the sine wave
          const sineWaveTrace = {
            x: timesteps,
            y: sineValues,
            mode: "lines",
            name: "Sine Wave",
          };

          // Create the layout for the sine wave plot
          const sineWaveLayout = {
            title: "Output Wave Generator",
            xaxis: { title: "Time (s)" },
            yaxis: { title: "Amplitude" },
          };
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
            "plot-container1",
            [sineWaveTrace],
            sineWaveLayout,
            config
          );
        }
        // SECOND GRAPH ENDING
        popup.style.display = "block";
      }
    }
  }
}
function closePopup() {
  popup.style.display = "none";
  document.getElementById("att").disabled = false;
}

//popup end
// output bell shaped graph
const frequencyData = [];
const voltageData = [];
const outputVoltageData = [];
const gainData = [];

function calculateOutputVoltage(frequency, inputVoltage) {
  const outputVoltage =
    (100 /
      Math.sqrt(1 + Math.pow(2770.53 / frequency - frequency / 2770.53, 2))) *
    inputVoltage;
  return outputVoltage;
}

function addToTable() {
  const frequency = parseFloat(document.getElementById("freqSpinner").value);
  const inputVoltage = parseFloat(document.getElementById("ampSpinner").value);

  if (!isNaN(frequency) && !isNaN(inputVoltage)) {
    const outputVoltage = calculateOutputVoltage(frequency, inputVoltage);
    const gain = outputVoltage / inputVoltage;

    frequencyData.push(frequency);
    voltageData.push(inputVoltage);
    outputVoltageData.push(outputVoltage);
    gainData.push(gain);

    valueCount++;
    // Add the data to the table
    const table = document.getElementById("dataTable");
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.innerHTML = frequency;
    cell2.innerHTML = inputVoltage;
    cell3.innerHTML = outputVoltage.toFixed(2); // Display output voltage with 2 decimal places
    cell4.innerHTML = gain.toFixed(2); // Display gain with 2 decimal places
  }

  document.getElementById("red-block1").disabled = false;
}
const redBlock1 = document.getElementById("red-block1");
const popup1 = document.getElementById("popup1");
const plotContainer1 = document.getElementById("graph");

redBlock1.addEventListener("click", openPopup1);

function openPopup1() {
  if (resetclicked && valueCount >= 10) {
    generateGraph();
    function generateGraph() {
      const graphData = [
        {
          x: frequencyData,
          y: gainData,
          type: "scatter",
          mode: "lines",
          name: "Frequency Response",
        },
      ];

      const layout = {
        title: "Single Tuned Amplifier Frequency Response",
        xaxis: {
          title: "Frequency (Hz)",
        },
        yaxis: {
          title: "Gain",
        },
      };
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

      Plotly.newPlot("graph", graphData, layout, config);
    }
    popup1.style.display = "block";
  } else {
    alert("Add atleast 10 values to visualize the output graph");
  }
}
function closePopup1() {
  popup1.style.display = "none";
}

const canva = document.getElementById("canvas");
canva.style.display = "none";
// const canvad=document.getElementById("canvas__div");
// canvad.style.display="none";
const canvac = document.getElementById("canvas-container");
canvac.style.display = "none";

notify.innerHTML =
  "Complete the connection and click on check button to check for the correctness of connection";

window.addEventListener("load", varinit);
