function toggleTable() {
    const table = document.getElementById('experimental-readings');
    table.style.display = table.style.display === 'none' ? 'table' : 'table';
}

function snapToNearestValidValue(value) {
    const validValues = [0, 3, 6, 10];
    return validValues.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
}

const resistanceSlider = document.getElementById('myResistance');
const capacitanceSlider = document.getElementById('myCapacitance');
const resistanceValueSpan = document.getElementById('resistanceValue');
const capacitanceValueSpan = document.getElementById('capacitanceValue');

resistanceSlider.addEventListener('input', function () {
    const snappedValue = snapToNearestValidValue(parseFloat(this.value));
    this.value = snappedValue;
    resistanceValueSpan.textContent = snappedValue;
});

capacitanceSlider.addEventListener('input', function () {
    const snappedValue = snapToNearestValidValue(parseFloat(this.value));
    this.value = snappedValue;
    capacitanceValueSpan.textContent = snappedValue;
});

// JavaScript to display the image container when the button is clicked
document.getElementById('graphButton').addEventListener('click', function () {
    document.getElementById('imageContainer').style.display = 'block';
});

document.getElementById("graphButton").addEventListener("click", function () {
    // Create a new paragraph element
    var newParagraph = document.createElement("p");
    newParagraph.textContent = "Below are the graphs of trigger input (V), voltage across the capacitor C (Vc), and the output voltage Vo.";
    newParagraph.style.textAlign = "center";
    newParagraph.style.marginBottom = "20px";  // Optional styling for spacing

    // Get the image container and insert the new paragraph above the image
    var imageContainer = document.getElementById("imageContainer");
    if (!document.getElementById("graphDescription")) { // Check to prevent adding the description multiple times
        newParagraph.setAttribute("id", "graphDescription");
        imageContainer.insertBefore(newParagraph, imageContainer.firstChild);
    }

    // Scroll to the image container
    imageContainer.scrollIntoView({ behavior: 'smooth' });
});

function toggleTable() {
    // Get the table element
    var table = document.getElementById("experimental-readings");

    // Show the table if it is hidden
    if (table.style.display === "none") {
        table.style.display = "table";  // Display the table
    }

    // Scroll to the table section
    table.scrollIntoView({ behavior: 'smooth' });
}