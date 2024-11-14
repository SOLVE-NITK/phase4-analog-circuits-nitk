// simulation variables
let L;
let C1;
let C2;
let time = 0;

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
// const canvas = document.getElementById("name-dia");
// const ctx = canvas.getContext("2d");

(showConnectionInfo = function (listDiv) {
  console.log(listDiv)
}),
(hideConnectionInfo = function () {
  listDiv.style.display = "none";
}),
(connections = []),
(updateConnections = function (conn, remove) {
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
});

// jsPlumb.ready(function () {

//     var instance = jsPlumb.getInstance();
//     instance.batch(function () {
//         instance.bind("connection", function (info, originalEvent) {
//             updateConnections(info.connection);
//         });
//         instance.bind("connectionDetached", function (info, originalEvent) {
//             updateConnections(info.connection, true);
//         });

//         instance.bind("connectionMoved", function (info, originalEvent) {

//             updateConnections(info.connection, true);
//         });
//         var exampleDropOptions = {
//             tolerance: "touch",
//             hoverClass: "dropHover",
//             activeClass: "dragActive"
//         };

//         var exampleEndpoint2 = {
//             endpoint: ["Dot", { radius: 7 }],
//             paintStyle: { fill: "black" },
//             isSource: true,
//             scope: "green",
//             connectorStyle: { stroke: "black", strokeWidth: 4 },
//             connector: ["Bezier", { curviness: 1 }],
//             maxConnections:1 ,
//             isTarget: true,
//             dropOptions: exampleDropOptions
//         };

//         var exampleEndpoint3 = {
//             endpoint: ["Dot", { radius: 7 }],
//             paintStyle: { fill: "red" },
//             isSource: true,
//             scope: "green",
//             connectorStyle: { stroke: "red", strokeWidth: 4 },
//             connector: ["Bezier", { curviness: 1 }],
//             maxConnections:1 ,
//             isTarget: true,
//             dropOptions: exampleDropOptions
//         };

//             instance.addEndpoint("dragDropWindow1", { anchor: [0, 0, 0, 0] }, exampleEndpoint3);
//             instance.addEndpoint("dragDropWindow2", { anchor: [0, 0, 0, 0] }, exampleEndpoint3);
//             instance.addEndpoint("dragDropWindow3", { anchor: [0, 0 , 0, 0] }, exampleEndpoint2);
//             instance.addEndpoint("dragDropWindow4", { anchor: [0, 0, 0, 0] }, exampleEndpoint2);
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
      $("#capacitorSlider2").slider("value", 0.01); // slider initialisation : jQuery widget
      $("#capacitorSpinner2").spinner("value", 0.01); // number initialisation : jQuery widget
      $("#inductorSlider").slider("value", 1);
      $("#inductorSpinner").spinner("value", 1);
      $("#capacitorSlider1").slider("value", 0.01);
      $("#capacitorSpinner1").spinner("value", 0.01);
    
      $("#capacitorSpinner2").spinner("disable");
      $("#capacitorSlider2").slider("disable");
      $("#inductorSpinner").spinner("disable");
      $("#inductorSlider").slider("disable");
      $("#capacitorSpinner1").spinner("disable");
      $("#capacitorSlider1").slider("disable");
      $("#simulate-button").prop("disabled", true);
      document.getElementById("simulate-button").style.opacity=0.5;
      $("#message").text("Complete the circuit connection");
      
    }

    function varchange() {
      $("#capacitorSlider2").slider({ max: 10, min: 0.01, step: 0.01 });
      $("#capacitorSpinner2").spinner({ max: 10, min: 0.01, step: 0.01 });
    
      $("#capacitorSlider2").on("slide", function (e, ui) {
        $("#capacitorSpinner2").spinner("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#capacitorSpinner2").on("spin", function (e, ui) {
        $("#capacitorSlider2").slider("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#capacitorSpinner2").on("change", function () {
        varchange();
      });
    
      $("#inductorSlider").slider({ max: 100, min: 1, step: 1 });
      $("#inductorSpinner").spinner({ max: 100, min: 1, step: 1 });
    
      $("#inductorSlider").on("slide", function (e, ui) {
        $("#inductorSpinner").spinner("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#inductorSpinner").on("spin", function (e, ui) {
        $("#inductorSlider").slider("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#inductorSpinner").on("change", function () {
        varchange();
      });
      $("#inductorSpinner").on("touch-start", function () {
        varchange();
      });
    
      $("#capacitorSlider1").slider({ max: 10, min: 0.01, step: 0.01 });
      $("#capacitorSpinner1").spinner({ max: 10, min: 0.01, step: 0.01  });
    
      $("#capacitorSlider1").on("slide", function (e, ui) {
        $("#capacitorSpinner1").spinner("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#capacitorSpinner1").on("spin", function (e, ui) {
        $("#capacitorSlider1").slider("value", ui.value);
        time = 0;
        varupdate();
      });
      $("#capacitorSpinner1").on("change", function () {
        varchange();
      });
    }


    function varupdate() {
      $("#capacitorSpinner2").spinner("value", $("#capacitorSlider2").slider("value"));                     //updating slider location with change in spinner(debug)
      $("#inductorSpinner").spinner("value", $("#inductorSlider").slider("value"));
      $("#capacitorSpinner1").spinner("value", $("#capacitorSlider1").slider("value"));
      L = $("#inductorSpinner").spinner("value"); //Updating variables
      C1 = $("#capacitorSpinner1").spinner("value");
      C2 = $("#capacitorSpinner2").spinner("value");
      ind = $("#inductorSpinner").spinner("value"); //Updating variables
      Cap1 = $("#capacitorSpinner1").spinner("value");
      Cap2 = $("#capacitorSpinner2").spinner("value");
      L = L/1000;
      C1 = C1/1000000;
      C2 = C2/1000000;
      var Ct = (C1 * C2) / (C1 +C2);
      var  f = 1 / (2 * Math.PI * Math.sqrt(L * Ct));
      document.querySelector("#frequency").innerHTML = f.toFixed(4) + "Hz"; //Displaying values
      generateGraph(f);
    }
    
var yy=document.getElementById("check-button")
yy.onclick=checkk;
var sim=document.getElementById("simulate-button")
sim.onclick=simulatee;


function simulatee()
{
  
  $("#message").text("Click on the CRO to view the generated sine wave");
  var para=document.getElementById("p1");
  para.style.opacity=1;
  var gra1=document.getElementById("graphbutton")
  var gra2=document.getElementById("image2")
  gra1.onclick=plotgraph;
  gra2.onclick=plotgraph;
  document.getElementById("simulate-button").style.opacity=0.5; 
  document.getElementById("simulate-button").disabled=true;
}

function checkk()
  {
    if(redLineConnected === false && blackLineConnected === false)
    {
      $("#capacitorSpinner2").spinner("disable");
      $("#capacitorSlider2").slider("disable");
      $("#inductorSpinner").spinner("disable");
      $("#inductorSlider").slider("disable");
      $("#capacitorSpinner1").spinner("disable");
      $("#capacitorSlider1").slider("disable");
      document.getElementById("simulate-button").disabled=true;
      $("#message").text("Complete the circuit connection");
      return false;
    }

    if(redLineConnected === false || blackLineConnected === false)
    {
      $("#capacitorSpinner2").spinner("disable");
      $("#capacitorSlider2").slider("disable");
      $("#inductorSpinner").spinner("disable");
      $("#inductorSlider").slider("disable");
      $("#capacitorSpinner1").spinner("disable");
      $("#capacitorSlider1").slider("disable");
      document.getElementById("simulate-button").disabled=true;
      $("#message").text("Connect the other wire");
      return false
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
    //     alert("Wrong Connections\n");
    //     return false;
    //   }
    // }

    if (redLineConnected === true || blackLineConnected === true) {
      alert("Circuit Connection is right, Provide the design values");
      $("#message").text("Provide the design values and click on simulate button");
      
      document.getElementById("check-button").disabled=true;
      $("#capacitorSpinner2").spinner("enable");
      $("#capacitorSlider2").slider("enable");
      $("#inductorSpinner").spinner("enable");
      $("#inductorSlider").slider("enable");
      $("#capacitorSpinner1").spinner("enable");
      $("#capacitorSlider1").slider("enable");
      document.getElementById("simulate-button").disabled=false;
      document.getElementById("simulate-button").style.opacity=1;
      document.getElementById("simulate-button").style.cursor='pointer';
      document.getElementById("check-button").style.opacity=0.5;

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

  //If simulation is running
  if (!simstatus) {
    //Disabling the slider,spinner and drop down menu
    $("#capacitorSpinner2").spinner("disable");
    $("#capacitorSlider2").slider("disable");
    $("#inductorSpinner").spinner("disable");
    $("#inductorSlider").slider("disable");
    $("#capacitorSpinner1").spinner("disable");
    $("#capacitorSlider1").slider("disable");
    
  }
  //If simulation is stopped
  if (simstatus) {
    //Enabling the slider,spinner and drop down menu
    $("#capacitorSpinner2").spinner("enable");
    $("#capacitorSlider2").slider("enable");
    $("#inductorSpinner").spinner("enable");
    $("#inductorSlider").slider("enable");
    $("#capacitorSpinner1").spinner("enable");
    $("#capacitorSlider1").slider("enable");
    
  }

function generateGraph(frequency) {
  let graphCanvas = document.getElementById('graphscreen'); // Make sure to replace 'yourGraphCanvasId' with the actual ID of your canvas element
  let graphctx = graphCanvas.getContext('2d');
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
  for (var i = 1.5; i >= -1.5; i-=0.5) {
    var yPos = ((3-i)/3) * (graphCanvas.height - 150) ;
    var label = i.toFixed(1);
    graphctx.fillText(label, 25, yPos-30 );
  }

  graphctx.save();
  graphctx.translate(0, graphCanvas.height - 40);
  graphctx.rotate(-Math.PI / 2);
  graphctx.fillText("Amplitude (m)->", 100, 15);
  graphctx.restore();

  // Draw x-axis labels
  for (var i = 1; i <= 10; i++) {
    var xPos = 50 + (i / 10) * (graphCanvas.width - 50);
    var label = (i * 0.1).toFixed(1);
    graphctx.fillText(label, xPos, graphCanvas.height - 160);
  }
  
  graphctx.fillText("Time (s)->", graphCanvas.width - 70, graphCanvas.height - 100);
  graphctx.closePath();

  graphctx.beginPath();
  graphctx.moveTo(52, graphCanvas.height -100);
  for (var t = 0; t < graphCanvas.width + 100; t++) {
    var y = Math.sin(2 * Math.PI * frequency * t / (graphCanvas.width -100)) * ((graphCanvas.height + 200) / 8) + (graphCanvas.height / 2);
    graphctx.lineTo(t+50, y+10);
  }
  graphctx.strokeStyle = "green";
  graphctx.lineWidth = 2;
  graphctx.stroke();
  graphctx.closePath();
}


function plotgraph() {
  const graphDiv = document.querySelectorAll(".graph-div");
  console.log(graphDiv);
  graphDiv.forEach((graph) => {
    graph.classList.toggle("display-hide");
  });
  generateGraph();
  graphDiv[0].scrollIntoView({
    behavior: "smooth",
  });
}

window.addEventListener("load", varinit);
