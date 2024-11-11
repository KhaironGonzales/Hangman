function generateInputFields() {
    // Get the user's input
    var userInput = document.getElementById('userInput').value;
    // Get the length of the user's input
    var length = userInput.length;

    // Get the container where the input fields will be added
    var container = document.getElementById('inputContainer');

    // Clear any existing input fields in the container
    container.innerHTML = '';

    // Generate and add the new input fields
    for (var i = 0; i < length; i++) {
        // Create a new input field
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = '?';
        inputField.className = 'generatedfields';
        // Append the input field to the container
        container.appendChild(inputField);
    }

    const form = document.getElementById("userinp");
    const divToHide = document.getElementById("hideMe");
    const divToShow = document.getElementById("maincon");

    form.addEventListener("click", function (event) {
        if (event.target.checkValidity()) { // Check form validity (optional)
            event.preventDefault();
            divToHide.style.display = "none";
            divToShow.style.display = "block";
        }

    });
    //setupKeyboardListeners();
    /*Bakit andito? Para after 
    lumbas nung generated na input fields 
    tsaka irururn yung function nayan*/
}
function setupKeyboardListeners() {
    // Get all buttons with the class 'letters'
    var buttons = document.querySelectorAll('.letters');
    var inputFields = document.querySelectorAll('.generatedfields');//

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var buttonText = this.innerText;

            // If the button text is the backspace symbol, clear the last filled input field
            if (buttonText === '⌫') {
                for (var i = inputFields.length - 1; i >= 0; i--) {
                    if (inputFields[i].value !== '') {
                        inputFields[i].value = '';
                        break;
                    }
                }
            } else {
                // Find the first empty input field and set its value
                for (var i = 0; i < inputFields.length; i++) {
                    if (inputFields[i].value === '') {
                        inputFields[i].value = buttonText;
                        break;
                    }
                }
            }
        });
    });
}





