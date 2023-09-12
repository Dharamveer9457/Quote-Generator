document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate-button');
    const themeInput = document.getElementById('theme-input');
    const quoteElement = document.getElementById('quote');

    generateButton.addEventListener('click', generateQuote);

    function generateQuote() {
        const theme = themeInput.value.trim();
        if (theme === '') {
            Swal.fire({
                icon: 'error',
                title: 'Input field cannot be empty',
                text: 'Type the theme for the quote',
                confirmButtonText: 'OK'
              });
        } else {
            fetch(`https://quote-generator-lhbc.onrender.com/get-quote/${theme}`)
            .then((response) => response.json())
            .then((data) => {
                // Append the generated quote to the quote container
                quoteElement.textContent = data.quote;
            })
            .catch((error) => {
                console.error("Error fetching quote:", error);
            });
        }
    }
});

