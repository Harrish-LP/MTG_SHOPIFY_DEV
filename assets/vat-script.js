document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class "money"
    var moneyElements = document.querySelectorAll('.money');

    // Loop through each element
    moneyElements.forEach(function(element) {
        // Get the current text content of the element
        var currentText = element.textContent.trim();
        // Append "+ VAT" to the current text
        element.textContent = currentText + " + VAT";
    });
});