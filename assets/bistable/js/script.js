var state = 0;
function changeBulbImage1() {
    const toggle = document.getElementById('toggle');
    const bulbImg1 = document.getElementById('bulbImg1');
    const bulbImg2 = document.getElementById('bulbImg2');

    if (!toggle.checked) { // Toggle is unchecked
        bulbImg1.src = 'https://image.ibb.co/cBBaeR/light_bulb_on.png'; // Bulb 1 on
        bulbImg2.src = 'https://image.ibb.co/hoBxtm/light_bulb_off.png'; // Bulb 2 off
    } else { // Toggle is checked
        bulbImg1.src = 'https://image.ibb.co/hoBxtm/light_bulb_off.png'; // Bulb 1 off
        bulbImg2.src = 'https://image.ibb.co/cBBaeR/light_bulb_on.png'; // Bulb 2 on
    }

    // Enable the simulate button
    document.querySelector('.myButton[onclick="changeBulbImage1(); displayText();"]').disabled = false;
}

document.getElementById('toggle').addEventListener('change', function () {
    const blueArrow = document.getElementById('blueArrow');
    const greenArrow = document.getElementById('greenArrow');
    if (this.checked) {
        blueArrow.style.display = 'none';
        greenArrow.style.display = 'inline';
    } else {
        blueArrow.style.display = 'inline';
        greenArrow.style.display = 'none';
    }
});

function displayText() {
    var displayParagraph = document.getElementById("displayText");
    var toggle = document.getElementById("toggle");

    if (toggle.checked) {
        displayParagraph.textContent = "Output of Bistable multivibrator has obtained a stable state of 0(LOW)";
    } else {
        displayParagraph.textContent = "Output of Bistable multivibrator has obtained a stable state of 1(HIGH)"; // Empty the paragraph if not checked
    }
}


// Select the img element by its id
var graphButton = document.getElementById('graphButton');
var simulateButton = document.getElementById('simulateButton');
var toggleSwitch = document.getElementById('toggle');

// Function to disable the graphButton
function disableGraphButton() {
    graphButton.style.pointerEvents = 'none';  // Disable pointer events
    graphButton.style.opacity = '0.5';         // Optionally reduce opacity
}

// Function to enable the graphButton
function enableGraphButton() {
    graphButton.style.pointerEvents = 'auto';  // Re-enable pointer events
    graphButton.style.opacity = '1';           // Restore full opacity
}

// Initial state: Disable graphButton
disableGraphButton();

toggle.addEventListener('change', function () {
    if (toggle.checked) {
        // If toggle switch is checked, disable graphButton
        disableGraphButton();
    } else {
        // If toggle switch is not checked, enable graphButton
        enableGraphButton();
    }
});

// Add event listener to simulateButton to enable graphButton
simulateButton.addEventListener('click', enableGraphButton);