function generateInputFields() {
    var userInput = document.getElementById('userInput').value.toUpperCase(); // Get the user's input and convert to uppercase
    var length = userInput.length; // Get the length of the user's input
    var container = document.getElementById('inputContainer'); // Get the container where the input fields will be added
    container.innerHTML = '';  // Clear any existing input fields in the container

    // Generate and add the new input fields
    for (var i = 0; i < length; i++) {
        // Create a new input field
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = '?';
        inputField.className = 'generatedfields';
        inputField.readOnly = true;  // Make the input fields read-only
        inputField.value = '*';  // Initially hide the characters
        container.appendChild(inputField);  // Append the input field to the container
    }

    const form = document.getElementById("userinp");
    const divToHide = document.getElementById("hideMe");
    const divToShow = document.getElementById("maincon");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        divToHide.style.display = "none";
        divToShow.style.display = "block";

        // Call the function to set up the listeners after showing the main container
        setupKeyboardListeners(userInput);
    });
}

function handleButtonClick(button, inputFields, userInput, currentCharIndex) {
    var buttonText = button.innerText.toUpperCase(); // Convert button text to uppercase

    // Check if the current character matches the button text
    if (buttonText === userInput[currentCharIndex]) {
        inputFields[currentCharIndex].value = buttonText;  // Set the character in the input field
        currentCharIndex++;  // Move to the next character
    } else {
        alert('Incorrect character! Please press the correct key.');
    }

    return currentCharIndex;
}

function setupKeyboardListeners(userInput) {
    var currentCharIndex = 0;
    var buttons = document.querySelectorAll('.letters');  // Get all buttons with the class 'letters'
    var inputFields = document.querySelectorAll('.generatedfields');  // Get all generated input fields

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            currentCharIndex = handleButtonClick(button, inputFields, userInput, currentCharIndex);

            // Hide the characters after entering the word
            if (currentCharIndex === inputFields.length) {
                setTimeout(() => {
                    inputFields.forEach(field => {
                        field.value = '*'; // Replace with asterisks
                    });
                }, 100); // 1 second delay before hiding the characters
            }
        });
    });
}

// Call the generateInputFields function on form submission
document.getElementById('userinp').addEventListener('submit', function (event) {
    event.preventDefault();
    generateInputFields();
});