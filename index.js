let incorrectGuesses = 0;

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
        inputField.readOnly = true;
        container.appendChild(inputField);  // Append the input field to the container
    }

    const form = document.getElementById("userinp");
    const divToHide = document.getElementById("hideMe");
    const divToShow = document.getElementById("maincon");

    form.addEventListener("click", function (event) {
        if (event.target.checkValidity()) { // Check form validity (optional)
            event.preventDefault();
            divToHide.style.display = "none";
            divToShow.style.display = "block";

            // Call the function to set up the listeners after showing the main container
            setupKeyboardListeners(userInput);
        }
    });
}

function setupKeyboardListeners(userInput) {
    var buttons = document.querySelectorAll('.letters');  // Get all buttons with the class 'letters'
    var inputFields = document.querySelectorAll('.generatedfields');  // Get all generated input fields

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleButtonClick(button, inputFields, userInput);
        });
    });
}

function handleButtonClick(button, inputFields, userInput) {
    var clickedLetter = button.innerText;
    var matched = false;

    for (var i = 0; i < userInput.length; i++) {
        if (userInput[i] === clickedLetter && inputFields[i].value !== clickedLetter) {
            inputFields[i].value = clickedLetter;
            matched = true;

            // Change the border color of the correct input field
            inputFields[i].style.borderColor = 'green';
            setTimeout(function (field) {
                field.style.borderColor = ''; // Reset the border color after 2 seconds
            }, 2000, inputFields[i]);
        }
    }

    if (!matched) {
        inputFields.forEach(function (field) {
            field.style.borderColor = 'red';
        });
        setTimeout(function () {
            inputFields.forEach(function (field) {
                field.style.borderColor = ''; // Reset the border color after 2 seconds
            });
        }, 2000);

        // Show next hangman image
        incorrectGuesses++;
        showHangmanImage();
    }

    if (checkWin(inputFields, userInput)) {
        setTimeout(function () {
            alert("You've won!");
        }, 500); // 500 milliseconds delay
    }
}

function checkWin(inputFields, userInput) {
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value !== userInput[i]) {
            return false;
        }
    }
    return true;
}

function showHangmanImage() {
    var hangmanImages = document.querySelectorAll('.image');

    hangmanImages.forEach(function (img) {
        img.style.display = 'none';
    });


    if (incorrectGuesses <= hangmanImages.length) {
        hangmanImages[incorrectGuesses - 1].style.display = 'block';

    }

    // If the maximum number of incorrect guesses is reached, show game over alert
    if (incorrectGuesses >= hangmanImages.length) {
        setTimeout(function () {
            alert("Game over!");
        }, 500); // 500 milliseconds delay
    }
}
