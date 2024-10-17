document.addEventListener('DOMContentLoaded', function () {
    const van = document.getElementById("virtual-van");
    let angle = 0; // Initial angle
    const speed = 0.02; // Speed of rotation
    const radius = 175; // Radius for circular motion

    // Get the position of the "I'M COMIN!!!" text
    const textElement = document.querySelector('.centered-text');
    const textRect = textElement.getBoundingClientRect();
    const centerX = textRect.left + textRect.width / 2; // Center X of the text
    const centerY = textRect.top + textRect.height / 2; // Center Y of the text

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

    // Reverse direction on click
    van.addEventListener('click', () => {
        angle += Math.PI; // Reverse rotation direction
    });

    // Move the van every 20ms
    setInterval(moveVan, 20);
});