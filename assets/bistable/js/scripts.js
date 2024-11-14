document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    const graphButton = document.getElementById('graphButton');
    const toggle = document.getElementById('toggle');

    const T1 = 30; // Time constant for horizontal movement
    const Q = 100; // Q value for vertical movement

    const xAxisLabel = 'Time (T)';
    const yAxisLabel = 'Q';

    let animationStarted = false;
    let isFirstGraph = true;
    let animationInterval; // Store animation interval ID to clear later

    // Event listener for graph button click
    graphButton.addEventListener('click', function () {
        if (toggle.checked) {
            animateVerticalGraph();
        } else {
            if (!animationStarted) {
                animateHorizontalGraph();
                animationStarted = true;
            } else {
                animateAdditionalHorizontalGraph();
            }
        }

        // Show the graph container after clicking the graph button
        document.querySelector('.graph-container').style.display = 'block';
    });

    // Event listener for toggle change
    toggle.addEventListener('change', function () {
        if (!toggle.checked) {
            // Reset animation state
            clearInterval(animationInterval); // Stop the current animation
            animationStarted = false;
            isFirstGraph = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            drawAxes(); // Redraw axes
        }
    });

    // Function to draw X and Y axes with labels
    function drawAxes() {
        // Draw X axis
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 50, canvas.height - 50);
        ctx.stroke();

        // Draw X axis label centered horizontally
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(xAxisLabel, canvas.width / 2, canvas.height - 10);

        // Draw Y axis
        ctx.beginPath();
        ctx.moveTo(50, 0); // Move to the top of the canvas
        ctx.lineTo(50, canvas.height - 50); // Draw to just above the bottom
        ctx.stroke();

        // Draw Y axis label at the top
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(yAxisLabel, canvas.width / 7.5, canvas.height - 125);
    }

    // Initial draw of axes when the page loads
    drawAxes();

    function animateHorizontalGraph() {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        let x = 50;
        let y = canvas.height - 50;

        let isFirstLineDrawn = false; // Flag to track if the first line is drawn

        animationInterval = setInterval(function () {
            // Move horizontally to the right by T1 units
            if (x < 50 + T1) {
                x += 1;
            }
            // Move vertically upwards to Q
            else if (y > canvas.height - 30 - Q) {
                y -= 1;
            }
            // Move horizontally to the right by an additional 30 units
            else if (x < 50 + T1 + 30) {
                x += 1;
            }
            // Animation complete
            else {
                clearInterval(animationInterval);
                isFirstGraph = false;
            }

            ctx.lineTo(x, y);
            ctx.stroke();

            // Add label "A" when the first line is drawn
            if (!isFirstLineDrawn) {
                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('A', x - -20, y - 10); // Adjust the position of 'A' relative to the line
                isFirstLineDrawn = true;
            }
        }, 10);
    }


    function animateVerticalGraph() {
        ctx.beginPath();
        let x = 50 + T1 + 30;
        let y = canvas.height - 30 - Q;

        let isSecondLineDrawn = false; // Flag to track if the second line is drawn

        animationInterval = setInterval(function () {
            // Move vertically downwards to Q
            if (y < canvas.height - 50) {
                y += 1;
            }
            // Move horizontally to the right by an additional 30 units
            else if (x < 50 + T1 + 60) {
                x += 1;
            }
            // Animation complete
            else {
                clearInterval(animationInterval);
            }

            ctx.lineTo(x, y);
            ctx.stroke();

            // Add label "B" when the second line is drawn
            if (!isSecondLineDrawn && x === 50 + T1 + 60 && y === canvas.height - 50) {
                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('B', x - 20, y - 10); // Adjust the position of 'B' relative to the line
                isSecondLineDrawn = true;
            }
        }, 10);
    }

});
