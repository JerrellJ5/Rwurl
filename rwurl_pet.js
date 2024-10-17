document.addEventListener('DOMContentLoaded', function () {
    const pet = document.getElementById("pet");
    const movementInterval = 300; // Time between random movements in milliseconds (0.3 seconds)
    const chaseDistance = 100; // Distance at which the pet will start to move away
    const screenWidth = window.innerWidth - pet.offsetWidth; // Calculate max X position
    const screenHeight = window.innerHeight - pet.offsetHeight; // Calculate max Y position

    let isMovingAway = false; // Track if the pet is moving away from the cursor
    let catchCount = parseInt(localStorage.getItem('catchCount')) || 0; // Retrieve catch count
    let chaseCount = parseInt(localStorage.getItem('chaseCount')) || 0; // Retrieve chase count

    // Function to move the pet randomly (free roaming)
    function floatPet() {
        if (!isMovingAway) { // Only move if the pet isn't currently evading the cursor
            const randomX = Math.floor(Math.random() * screenWidth);
            const randomY = Math.floor(Math.random() * screenHeight);

            // Move the pet to a new random position
            pet.style.left = `${randomX}px`;
            pet.style.top = `${randomY}px`;
        }
    }

    // Function to make the pet run away from the cursor
    function moveAwayFromCursor(event) {
        const petRect = pet.getBoundingClientRect();
        const petCenterX = petRect.left + petRect.width / 2;
        const petCenterY = petRect.top + petRect.height / 2;

        // Calculate the distance from the pet to the cursor
        const distanceX = event.clientX - petCenterX;
        const distanceY = event.clientY - petCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If the cursor is close enough, move the pet away
        if (distance < chaseDistance) {
            // Introduce erratic movement
            const moveX = petCenterX - distanceX * (3 + Math.random()); // Move away faster with variability
            const moveY = petCenterY - distanceY * (3 + Math.random()); // Move away faster with variability

            // Randomly teleport the pet occasionally
            if (Math.random() < 0.1) { // 10% chance to teleport
                const randomX = Math.floor(Math.random() * screenWidth);
                const randomY = Math.floor(Math.random() * screenHeight);
                pet.style.left = `${randomX}px`;
                pet.style.top = `${randomY}px`;
                return; // Skip the normal movement
            }

            // Add shake animation when being chased
            pet.classList.add('shake');
            setTimeout(() => pet.classList.remove('shake'), 500); // Remove shake after animation

            // Set the new position of the pet
            pet.style.left = `${Math.min(Math.max(0, moveX), screenWidth)}px`;
            pet.style.top = `${Math.min(Math.max(0, moveY), screenHeight)}px`;

            isMovingAway = true; // Set the state to moving away
            chaseCount++; // Increment chase count
            localStorage.setItem('chaseCount', chaseCount); // Update chase count in local storage
        } else {
            isMovingAway = false; // Reset the state if cursor is not close
        }
    }

    // Function to handle catching the pet
    function catchPet() {
        catchCount++; // Increment catch count
        localStorage.setItem('catchCount', catchCount); // Update catch count in local storage
        alert("You finally caught me! What took so long? :D"); // Display catch message
    }

    // Add event listeners for catching and moving away
    pet.addEventListener('mouseenter', catchPet); // Catch on hover
    document.addEventListener('mousemove', moveAwayFromCursor); // Chase effect on mouse movement

    // Start the pet's free roaming behavior
    setInterval(floatPet, movementInterval); // Move randomly every 0.3 seconds

    // Random movement adjustments for evasiveness
    setInterval(() => {
        if (isMovingAway) {
            // Introduce random slight movements to make it harder to catch
            const randomDirection = Math.random() < 0.5 ? -1 : 1; // Randomize direction
            const randomOffset = Math.floor(Math.random() * 30) * randomDirection; // Random offset
            pet.style.transform = `translate(${randomOffset}px, ${randomOffset}px)`; // Move slightly
        }
    }, 300); // Adjust every 300ms
});