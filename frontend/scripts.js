document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate-button');
    const themeInput = document.getElementById('theme-input');
    const quoteElement = document.getElementById('quote');
    const loader = document.getElementById('loader');

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
            loader.style.display = 'block'; // Show loader
            quoteElement.style.display = 'none';

            fetch(`https://quote-generator-lhbc.onrender.com/get-quote/${theme}`)
            .then((response) => response.json())
            .then((data) => {
                loader.style.display = 'none';
                quoteElement.style.display = 'block';
                quoteElement.textContent = data.quote;
            })
            .catch((error) => {
                console.error("Error fetching quote:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch a quote. Please try again later.',
                    confirmButtonText: 'OK'
                });
                loader.style.display = 'none';
                quoteElement.style.display = 'block';
                quoteElement.textContent = 'Type your theme and click on Generate Quote';
            });
        }
    }
});

