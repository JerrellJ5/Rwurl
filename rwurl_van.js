document.addEventListener('DOMContentLoaded', function () {
    const van = document.getElementById("virtual-van");
    let angle = 0; // Initial angle
    const speed = 0.02; // Speed of rotation
    let radius = Math.min(window.innerWidth, window.innerHeight) * 0.2; // Dynamic radius based on screen size

    // Function to get the center of the "I'M COMIN!!!" text
    function updateTextPosition() {
        const textElement = document.querySelector('.centered-text');
        const textRect = textElement.getBoundingClientRect();
        return {
            centerX: textRect.left + textRect.width / 2,
            centerY: textRect.top + textRect.height / 2
        };
    }

    let { centerX, centerY } = updateTextPosition();

    // Function to move the van in a circular motion
    function moveVan() {
        const x = centerX + radius * Math.cos(angle) - van.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - van.offsetHeight / 2;

        // Update the van's position
        van.style.left = `${x}px`;
        van.style.top = `${y}px`;

        // Increment the angle for the next frame
        angle += speed;
    }

    // Update radius and center position on window resize
    window.addEventListener('resize', function () {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.2; // Recalculate radius
        ({ centerX, centerY } = updateTextPosition()); // Recalculate center position
    });

    // Reverse direction on click
    van.addEventListener('click', () => {
        angle += Math.PI; // Reverse rotation direction
    });

    // Move the van every 20ms
    setInterval(moveVan, 20);
});
