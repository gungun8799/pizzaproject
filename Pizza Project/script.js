let score = 0;
let toppings = [];

function rollDough() {
    alert('The dough has been rolled out!');
    // Additional logic here...
}

function addTopping(topping) {
    const toppingButton = document.getElementById(`btn-${topping}`);
    if (!toppings.includes(topping)) {
        toppings.push(topping);
        toppingButton.classList.add('highlighted');
        alert(`You added ${topping}.`);
        score += 10; // Increment the score for adding a topping
    } else {
        toppings = toppings.filter(t => t !== topping);
        toppingButton.classList.remove('highlighted');
        alert(`You removed ${topping}.`);
        score -= 10; // Decrement the score for removing a topping
    }
    // Update score display logic here...
}

function toggleTopping(topping) {
    const toppingButton = document.getElementById(`btn-${topping}`);
    if (toppings.includes(topping)) {
        toppings.splice(toppings.indexOf(topping), 1);
        toppingButton.classList.remove('highlighted');
    } else {
        toppings.push(topping);
        toppingButton.classList.add('highlighted');
    }
}

function bakePizza() {
    const ovenTemp = document.getElementById('ovenTemp').value;
    const bakingTime = document.getElementById('bakingTime').value;

    // Check if the dough has been rolled and toppings added
    if (toppings.length === 0) {
        alert('Please roll the dough and add toppings before baking.');
        return;
    }

    // Check if oven temperature and baking time have been set
    if (!ovenTemp || !bakingTime) {
        alert('Please set the oven temperature and baking time before baking.');
        return;
    }

    // Convert string input to numbers and continue with existing logic
    const tempScore = Math.max(0, 50 - Math.abs(350 - ovenTemp)); // Max of 50 points for temperature
    const timeScore = Math.max(0, 50 - Math.abs(30 - bakingTime)); // Max of 50 points for time
    score += tempScore + timeScore;
    
       // Disable the bake button during the animation
    document.querySelector('.bake-button').disabled = true;

    // Start the baking animation
    animateCircles();


 
}


function animateCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.classList.remove('green'); // Remove green class at start of animation
    });

    let count = 0;
    const interval = setInterval(() => {
        if (count < circles.length) {
            circles[count].classList.add('green');
            count++;
        } else {
            clearInterval(interval);
            displayResultAndReset();
        }
    }, 1000);
}


function displayResultAndReset() {
    const ovenTemp = document.getElementById('ovenTemp').value;
    const bakingTime = document.getElementById('bakingTime').value;

    // Calculate the score based on oven temperature and baking time
    // Each component has a maximum of 50 points, for a total maximum of 100 points
    const tempDifference = Math.abs(350 - ovenTemp);
    const timeDifference = Math.abs(30 - bakingTime);

    // The closer the temperature and time are to the desired values, the higher the score
    // Subtract the difference from 50, ensuring the score cannot go below 0
    const tempScore = Math.max(0, 50 - tempDifference);
    const timeScore = Math.max(0, 50 - timeDifference);

    // Sum the individual scores and ensure the total does not exceed 100
    score = Math.min(100, tempScore + timeScore);

    // Construct the result message
    let resultMessage = 'Your pizza is ready!';

    if (tempDifference !== 0 || timeDifference !== 0) {
        resultMessage = 'Your pizza could be better.';
    }

    if (ovenTemp > 400 || bakingTime > 40 || ovenTemp < 300 || bakingTime < 20) {
        resultMessage = 'Your pizza is not ideal.';
    }

    // Display the final score as a fraction of 100
    alert(`${resultMessage} Your final score is: ${score}/100.`);
    
    // Reset the game for the next round
    resetGame();
}

function resetGame() {
    document.getElementById('ovenTemp').value = '';
    document.getElementById('bakingTime').value = '';

    score = 0;
    toppings = [];

    document.querySelectorAll('.control-button').forEach(button => button.classList.remove('highlighted'));

    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('green'); // Make sure to remove green class
    });

    document.querySelector('.bake-button').disabled = false;
}
