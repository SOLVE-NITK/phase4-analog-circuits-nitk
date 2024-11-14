// simulation variables
let F;
let E;
let Vin;
let Vout;
let Ic = 0.5;
let Icq;
let Vcc=12;
let Rc = 1200;
let Pac,Pdc;
let time = 0;
var f = 0;
var count = 1;
let redLine = [0, 0];
let blackLine = [0, 0];
let redLineConnected = false;
let blackLineConnected = false;
document.getElementById("dot1Red").addEventListener("click", function () {
  redLine[0] = 1;
  if (redLine[0] == 1 && redLine[1] == 1) {
    document.querySelector(".line-1").style.display = "block";
    redLineConnected = true;
  }
});
document.getElementById("dot1Black").addEventListener("click", function () {
  blackLine[0] = 1;
  if (blackLine[0] == 1 && blackLine[1] == 1) {
    document.querySelector(".line-2").style.display = "block";
    blackLineConnected = true;
  }
});
document.getElementById("dot2Red").addEventListener("click", function () {
  redLine[1] = 1;
  if (redLine[0] == 1 && redLine[1] == 1) {
    document.querySelector(".line-1").style.display = "block";
    redLineConnected = true;
  }
});
document.getElementById("dot2Black").addEventListener("click", function () {
  blackLine[1] = 1;
  if (blackLine[0] == 1 && blackLine[1] == 1) {
    document.querySelector(".line-2").style.display = "block";
    blackLineConnected = true;
  }
});
let graphCanvas = document.getElementById('graphscreen1'); // Make sure to replace 'yourGraphCanvasId' with the actual ID of your canvas element
  let graphctx = graphCanvas.getContext('2d');
  graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);


  let graphCanvas1 = document.getElementById('graphscreen2'); // Make sure to replace 'yourGraphCanvasId' with the actual ID of your canvas element
  let graphctx1 = graphCanvas1.getContext('2d');

  let graphCanvas2 = document.getElementById('graphscreen3'); // Make sure to replace 'yourGraphCanvasId' with the actual ID of your canvas element
  let graphctx2 = graphCanvas2.getContext('2d');
  graphCanvas2.style.display="none";

showConnectionInfo = function (listDiv) {
  console.log(listDiv)
},
hideConnectionInfo = function () {
  listDiv.style.display = "none";
},
connections = [],
updateConnections = function (conn, remove) {
if (!remove) connections.push(conn);
else {
  var idx = -1;
  for (var i = 0; i < connections.length; i++) {
    if (connections[i] == conn) {
      idx = i;
      break;
    }
  }
  if (idx != -1) connections.splice(idx, 1);
}

if (connections.length > 0) {
  var listDiv = []
  for (var j = 0; j < connections.length; j++) {
    listDiv.push(connections[j].sourceId)
    listDiv.push(connections[j].targetId)
}
   showConnectionInfo(listDiv);
} else
   hideConnectionInfo();
};

// jsPlumb.ready(function () {

//     var instance = jsPlumb.getInstance();

//     // suspend drawing and initialise.
//     instance.batch(function () {

//         // bind to connection/connectionDetached events, and update the list of connections on screen.
//         instance.bind("connection", function (info, originalEvent) {
//             updateConnections(info.connection);
//         });
//         instance.bind("connectionDetached", function (info, originalEvent) {
//             updateConnections(info.connection, true);
//         });

//         instance.bind("connectionMoved", function (info, originalEvent) {
//             //  only remove here, because a 'connection' event is also fired.
//             // in a future release of jsplumb this extra connection event will not
//             // be fired.
//             updateConnections(info.connection, true);
//         });
//         var exampleDropOptions = {
//             tolerance: "touch",
//             hoverClass: "dropHover",
//             activeClass: "dragActive"
//         };

//         var exampleEndpoint2 = {
//             endpoint: ["Dot", { radius: 6 }],
//             paintStyle: { fill: "black" },
//             isSource: true,
//             scope: "green",
//             connectorStyle: { stroke: "black", strokeWidth: 5 },
//             connector: ["Bezier", { curviness: 10 }],
//             maxConnections:1 ,
//             isTarget: true,
//             dropOptions: exampleDropOptions
//         };

//         var exampleEndpoint3 = {
//             endpoint: ["Dot", { radius: 6 }],
//             paintStyle: { fill: "red" },
//             isSource: true,
//             scope: "green",
//             connectorStyle: { stroke: "red", strokeWidth: 5 },
//             connector: ["Bezier", { curviness: 1 }],
//             maxConnections:1 ,
//             isTarget: true,
//             dropOptions: exampleDropOptions
//         };

//             instance.addEndpoint("dragDropWindow1", { anchor: [0, 0, 0, 0] }, exampleEndpoint3);
//             instance.addEndpoint("dragDropWindow2", { anchor: [0, 0, 0, 0] }, exampleEndpoint3);
//             instance.addEndpoint("dragDropWindow3", { anchor: [0,0 , 0, 2] }, exampleEndpoint2);
//             instance.addEndpoint("dragDropWindow4", { anchor: [0, 0, 0, 2] }, exampleEndpoint2);
//             instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

//             var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
//             instance.on(dragLinks, "click", function (e) {
//                 var s = instance.toggleDraggable(this.getAttribute("rel"));
//                 this.innerHTML = (s ? 'disable dragging' : 'enable dragging');
//                 jsPlumbUtil.consume(e);
//             });

//             var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
//             instance.on(detachLinks, "click", function (e) {
//                 instance.deleteConnectionsForElement(this.getAttribute("rel"));
//                 jsPlumbUtil.consume(e);
//             });

//             instance.on(document.getElementById("clear"), "click", function (e) {

//                 instance.detachEveryConnection();
//                 showConnectionInfo("");
//                 jsPlumbUtil.consume(e);
//             });
           
//         });
//         jsPlumb.fire("jsPlumbDemoLoaded", instance);

//     });


    function varinit() {
      varchange();
      //Variable slider and number input types

      $("#frequencySlider").slider("value", 1000);
      $("#frequencySpinner").spinner("value", 1000);
      $("#voltageSlider").slider("value", 1);
      $("#voltageSpinner").spinner("value", 1);
    

      $("#frequencySpinner").spinner("disable");
      $("#frequencySlider").slider("disable");
      $("#voltageSpinner").spinner("disable");
      $("#voltageSlider").slider("disable");
      $("#simulate-button").prop("disabled", true);
      document.getElementById("simulate-button").style.opacity=0.5;
      $("#tabulate-button").prop("disabled", true);
      document.getElementById("tabulate-button").style.opacity=0.5;
      $("#plot-button").prop("disabled", true);
      document.getElementById("plot-button").style.opacity=0.5;
      $("#message").text("Complete the circuit connection");
      
      
    }

    function varchange() {
     
    
      $("#frequencySlider").slider({ max: 3000, min: 1000, step: 100 });
      $("#frequencySpinner").spinner({ max: 3000, min: 1000, step: 100 });
    
      $("#frequencySlider").on("slide", function (e, ui) {
        $("#frequencySpinner").spinner("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#frequencySpinner").on("spin", function (e, ui) {
        $("#frequencySlider").slider("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#frequencySpinner").on("change", function () {
        varchange();
      });
      $("#frequencySpinner").on("touch-start", function () {
        varchange();
      });
    
      $("#voltageSlider").slider({ max: 30, min: 1, step: 0.05 });
      $("#voltageSpinner").spinner({ max: 30, min: 1, step: 0.05  });
    
      $("#voltageSlider").on("slide", function (e, ui) {
        $("#voltageSpinner").spinner("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#voltageSpinner").on("spin", function (e, ui) {
        $("#voltageSlider").slider("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#voltageSpinner").on("change", function () {
        varchange();
      });
    }


    function varupdate() {
      
      $("#frequencySpinner").spinner("value", $("#frequencySlider").slider("value"));
      $("#voltageSpinner").spinner("value", $("#voltageSlider").slider("value"));
      F = $("#frequencySpinner").spinner("value"); //Updating variables
      vin = $("#voltageSpinner").spinner("value");
      Vout=vin;
      
      Pac = (Vcc * Vcc) / (2 * Rc);
      Pdc = (Vcc * Vcc) / (8 * Rc);
      generateGraph(vin,F);
      generateGraph1(F);
      sim.onclick=simulatee;
    }
 let num=0;   
var yy=document.getElementById("check-button");
yy.onclick=checkk;
var sim=document.getElementById("simulate-button");
sim.onclick=simulatee;
var tab = document.getElementById("tabulate-button");
tab.onclick = insert;

var pl = document.getElementById("plot-button");
pl.onclick = plott;

var scatterData = [];

var scatterChart;
document.getElementById("res").style.opacity=0;
function insert()
{
  if(num<10)
  {
    if(num>=2)
    {
      $("#result").show();
      document.getElementById("plot-button").disabled=false;
      document.getElementById("plot-button").style.opacity=1;
      $("#message").text("Click on plot button to get the Pin vs Pout graph");
    }
      document.getElementById("tabulate-table").style.opacity=1;
      F = $("#frequencySpinner").spinner("value"); //Updating variables
      vin = $("#voltageSpinner").spinner("value");
      
      Vout=vin;
      
      Pdc = (Vout * Vout) / (2 * Rc);
      Pac = (Vout * Vout) / (8 * Rc);
      E = (Pac / Pdc) * 100;
      scatterData.push({
        x: parseFloat(Pdc),
        y: parseFloat(Pac)
      });
      var newRow = document.createElement('tr');
      var newValueCell1 = document.createElement('td');
      var newValueCell2 = document.createElement('td');
      var newValueCell3 = document.createElement('td');
      var newValueCell4 = document.createElement('td');
      var newValueCell5 = document.createElement('td');
      var newValueCell6 = document.createElement('td');
      newValueCell1.textContent = count++;
      newValueCell2.textContent = vin;
      newValueCell3.textContent = Vout;
      newValueCell4.textContent = (Pac).toFixed(8);
      newValueCell5.textContent = (Pdc).toFixed(8);
      newValueCell6.textContent = E.toFixed(8);
      newRow.appendChild(newValueCell1);
      newRow.appendChild(newValueCell2);
      newRow.appendChild(newValueCell3);
      newRow.appendChild(newValueCell4);
      newRow.appendChild(newValueCell5);
      newRow.appendChild(newValueCell6);
      document.getElementById("tabulate-table").appendChild(newRow);
num++;
}
else{
  alert("You have reached the maximum number of values");
  $("#message").text("Click on plot");

}
}

function simulatee()
{
  
  $("#message").text("Click on the CRO to view the generated sine wave");
  $('#comments').show();
  
  document.getElementById("simulate-button").disabled=true;
  document.getElementById("simulate-button").style.opacity=0.5;
  $("#frequencySpinner").spinner("disable");
  $("#frequencySlider").slider("disable");
  var gr = document.getElementById("button");
var aph = document.getElementById("image2");
  gr.onclick = plotgraph;
  aph.onclick = plotgraph;
  document.getElementById("res").style.opacity=1;


}

function checkk() {
  if (redLineConnected === false && blackLineConnected === false) {
    $("#frequencySpinner").spinner("disable");
    $("#frequencySlider").slider("disable");
    $("#voltageSpinner").spinner("disable");
    $("#voltageSlider").slider("disable");
    $("#simulate-button").prop("disabled", true);
    $("#message").text("Complete the circuit connection");
    return false;
  }

  if (redLineConnected === false || blackLineConnected === false) {
    $("#frequencySpinner").spinner("disable");
    $("#frequencySlider").slider("disable");
    $("#voltageSpinner").spinner("disable");
    $("#voltageSlider").slider("disable");
    $("#simulate-button").prop("disabled", true);
    $("#message").text("Connect the other wire");
    return false;
  }

    // if (connections.length > 0) {
    //   var listDiv = []
    //   for (var j = 0; j < connections.length; j++) {
    //     listDiv.push(connections[j].sourceId)
    //     listDiv.push(connections[j].targetId)       
    //   }
    //   var f=0
		// 	var num=[]
		// 	for(i=0;i<4;i++){
		// 	 num[i]=parseInt(listDiv[i].substring(14));
		// 		//alert(num[i]);
		// 	}

    //   for(var i=0;i<4;i+=2)
    //   {
		// 	  if((num[i]+1==num[i+1])||(num[i]-1==num[i+1])) continue
		// 	  else {f=1;break;}
    //   }

    //   if(f!=0) {
    //     alert("Wrong Connections");
    //     return false;
    //   }
    // }

    // if (f==0) {
    //   $("#message").text("Set the Frequency Value");
      
    //   document.getElementById("check-button").disabled=true;
    //   document.getElementById("check-button").style.opacity=0.5;
    //   $("#frequencySpinner").spinner("enable");
    //   $("#frequencySlider").slider("enable");
    //   $("#voltageSpinner").spinner("enable");
    //   $("#voltageSlider").slider("enable");
    //   document.getElementById("simulate-button").disabled=false;
    //   document.getElementById("simulate-button").style.opacity=1;
    //   document.getElementById("simulate-button").style.cursor='pointer';
    //   return true;
    // }
    
    
// }
if (redLineConnected === true && blackLineConnected === true) {
  alert("Circuit Connection is right, Provide the design values");
  $("#message").text("Set the Frequency & Voltage value and click on simulate button");

  document.getElementById("check-button").disabled = true;
  document.getElementById("check-button").style.opacity = 0.5;
  $("#frequencySpinner").spinner("enable");
  $("#frequencySlider").slider("enable");
  $("#voltageSpinner").spinner("enable");
  $("#voltageSlider").slider("enable");
  document.getElementById("simulate-button").disabled = false;
  document.getElementById("simulate-button").style.opacity = 1;
  document.getElementById("simulate-button").style.cursor = "pointer";
  return true;
}
}

// fix scaling of canavs as per media
let mediaQuery1 = window.matchMedia("screen and (max-width: 540px)");
let mediaQuery2 = window.matchMedia("screen and (max-width: 704px)");
let mediaQuery3 = window.matchMedia("screen and (max-width: 820px)");
let mediaQuery4 = window.matchMedia("screen and (max-width: 912px)");
let scaleX = 0.5;
let scaleY = 0.5;


//start of simulation here; starts the timer with increments of 0.01 seconds
function startsim() {
  pauseTime = setInterval("varupdate();", "100");
  simstatus = 1;
}
// switches state of simulation between 0:Playing & 1:Paused
// function simstate() {
//   let imgfilename = document.getElementById("playpausebutton").src;
//   imgfilename = imgfilename.substring(
//     imgfilename.lastIndexOf("/") + 1,
//     imgfilename.lastIndexOf(".")
//   );
  // if (imgfilename === "bluepausedull") {
  //   document.getElementById("playpausebutton").src =
  //     "./images/blueplaydull.svg";

  //   clearInterval(simTimeId);
  //   simstatus = 1;
  //   pauseTime = setInterval("varupdate();", "100");
  //   document.querySelector(".playPause").textContent = "Play";
  // }
  // if (imgfilename === "blueplaydull") {
  //   document.getElementById("playpausebutton").src =
  //     "./images/bluepausedull.svg";
  //   simstatus = 0;
  //   clearInterval(pauseTime);
  //   time = 0;
  //   simTimeId = setInterval("varupdate();time+=.01;", 10);
  //   document.querySelector(".playPause").textContent = "Pause";
  // }
// }

  //If simulation is running
  if (!simstatus) {
    //Disabling the slider,spinner and drop down menu

    $("#frequencySpinner").spinner("disable");
    $("#frequencySlider").slider("disable");
    $("#voltageSpinner").spinner("disable");
    $("#voltageSlider").slider("disable");
    
  }
  //If simulation is stopped
  if (simstatus) {
    $("#frequencySpinner").spinner("enable");
    $("#frequencySlider").slider("enable");
    $("#voltageSpinner").spinner("enable");
    $("#voltageSlider").slider("enable");
    
  }


const setMediaQueries = function (ctx) {
  let originalX = 20;
  if (mediaQuery1.matches) {
    scaleX = 1.5;
    // originalX = 20;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.6;
  } else if (mediaQuery2.matches) {
    scaleX = 1;
    // originalX = canvas.width / 4 - 10;
    scaleY = 0.6;
  } else if (mediaQuery3.matches) {
    scaleX = 1;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.4;
  } else if (mediaQuery4.matches) {
    scaleX = 1;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.4;
  } else {
    // originalX = canvas.width / 4 - 20;
    scaleX = 0.3;
    scaleY = 0.5;
  }
  ctx.canvas.width = document.documentElement.clientWidth * scaleX;
  ctx.canvas.height = document.documentElement.clientHeight * scaleY;
  return originalX;
};
function generateGraph(velocity, frequency) {
  
  let scaleX = 0.6; // Adjust scale factors as needed
  let scaleY = 0.6;

  graphCanvas.width = document.documentElement.clientWidth * scaleX;
  graphCanvas.height = document.documentElement.clientHeight * scaleY;
  graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphctx.beginPath();
  graphctx.moveTo(48, 100);
  graphctx.lineTo(52, 380);
  graphctx.moveTo(50, 225);
  graphctx.lineTo(graphCanvas.width, 225);
  graphctx.strokeStyle = "black";
  graphctx.stroke();
  graphctx.font = "1.5rem Nunito";
  
  // Draw y-axis labels
    var a = velocity/2;
    var label = a.toFixed(1);
    graphctx.fillText(label, 25, 150 );
    var b = -velocity/2;
    var label1 = b.toFixed(1);
    graphctx.fillText(label1,23,300);
    graphctx.fillText(0,30,220)
  

  graphctx.save();
  graphctx.fillText("Vin", 20, 110);
  graphctx.fillText("Input\nsignal", graphCanvas.width-100, 120);
  graphctx.restore();

  // Draw x-axis labels
  for (var i = 1; i <= (frequency * 2 / 1000); i++) {
    var xPos = (frequency * 10 / 1000) + (i / (frequency * 2 / 1000)) * (graphCanvas.width - 50);
    var label = (i * 1).toFixed(0) +("\u03C0");
    graphctx.fillText(label, xPos, graphCanvas.height - 160);
  }
  
  graphctx.fillText("Time ->", graphCanvas.width - 70, graphCanvas.height - 100);
  graphctx.closePath();

  graphctx.beginPath();
  graphctx.moveTo(52, 220);
  for (var t = 0; t < graphCanvas.width + 100; t++) {
    var y = -1 * Math.sin(2 * Math.PI * (frequency/1000) * t / (graphCanvas.width -100)) * ((graphCanvas.height + 200) / 8) + (graphCanvas.height / 2);
    graphctx.lineTo(t+50, y+20);
  }
  graphctx.strokeStyle = "blue";
  graphctx.lineWidth = 2;
  graphctx.stroke();
  graphctx.closePath();
}

function generateGraph1(frequency) {

  let scaleX = 0.6; // Adjust scale factors as needed
  let scaleY = 0.6;

  graphCanvas1.width = document.documentElement.clientWidth * scaleX;
  graphCanvas1.height = document.documentElement.clientHeight * scaleY;
  graphctx1.clearRect(0, 0, graphCanvas1.width, graphCanvas1.height);
  graphctx1.beginPath();
  graphctx1.moveTo(48, 100);
  graphctx1.lineTo(52, 320);
  graphctx1.moveTo(50, 320);
  graphctx1.lineTo(graphCanvas1.width, 320);
  graphctx1.strokeStyle = "black";
  graphctx1.stroke();
  graphctx1.font = "1.5rem Nunito";
  
  // Draw y-axis labels

    graphctx1.fillText("Icq", 25, 220 );
  

  graphctx1.save();
  graphctx1.fillText("250mA", 0, 150);
  graphctx1.fillText(0, 30, 320);
  graphctx1.restore();

  // Draw x-axis labels
  graphctx1.fillText("Output\nsignal", graphCanvas1.width-100, 120);

  
  graphctx1.fillText("Time (s)->", graphCanvas1.width - 70, graphCanvas1.height - 75);
  graphctx1.closePath();

  graphctx1.beginPath();
  graphctx1.moveTo(52, 220);
  for (var t = 0; t < graphCanvas1.width + 100; t++) {
    var y = -1* Math.sin(2 * Math.PI * (frequency/1000) * t / (graphCanvas1.width -100)) * ((graphCanvas1.height + 200) / 8) + (graphCanvas1.height / 2);
    graphctx1.lineTo(t+50, y+10);
  }
  graphctx1.strokeStyle = "green";
  graphctx1.lineWidth = 2;
  graphctx1.stroke();
  graphctx1.closePath();
}


function plotgraph() {
  const graphDiv = document.querySelectorAll(".graph-div");
  console.log(graphDiv);
  graphDiv.forEach((graph) => {
    graph.classList.toggle("display-hide");
  });
  generateGraph();
  generateGraph1();
  graphDiv[0].scrollIntoView({
    behavior: "smooth",
  });
  document.getElementById("tabulate-button").disabled=false;
  document.getElementById("tabulate-button").style.opacity=1;
 
  $("#message").text("Click on the tabulate to tabulate the readings");

}

function plott() {
  // Clear both canvases
  graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphctx1.clearRect(0, 0, graphCanvas1.width, graphCanvas1.height);
  
  // Hide graphScreen2
  graphCanvas1.style.display = "none";
  graphCanvas.style.display = "none";
  graphCanvas2.style.display = "block";
  // Destroy existing scatter chart if it exists
  if (scatterChart) {
    scatterChart.destroy();
  }

  // Create a new scatter chart with only scatter data
  scatterChart = new Chart(graphctx2, {
    type: 'scatter',
    data: {
      datasets: [{
        label: "Input Power vs Output Power",
        data: scatterData,
        borderColor: 'rgba(75, 192, 192, 0.5)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        showLine: true, // Disable line
        pointRadius: 5, // Increase point size for better visibility
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text:  'Input power (Pin)'
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display:true,
            text: 'Output power (Pout)'
          }
        }
      }
    }
  });
}


window.addEventListener("load", varinit);
