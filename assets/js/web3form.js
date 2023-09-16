document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    //pop up
    // const openFormButton = document.getElementById('open-form-button');
    // const closeFormButton = document.getElementById('close-form-button');
    // const formOverlay = document.getElementById('form-overlay');

    // openFormButton.addEventListener('click', function () {
    //     formOverlay.classList.add('is-active');
    // });

    // closeFormButton.addEventListener('click', function () {
    //     formOverlay.classList.remove('is-active');
    // });

    // openFormButton.addEventListener('click', function () {
    //     formOverlay.classList.add('is-active');
    // });

    // closeFormButton.addEventListener('click', function () {
    //     formOverlay.classList.remove('is-active');
    // });


    // Reset previous error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate inputs
    if (name.trim() === '') {
        nameError.textContent = 'This field is required';
    }

    if (email.trim() === '') {
        emailError.textContent = 'This field is required';
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Invalid email address';
    }

    if (message.trim() === '') {
        messageError.textContent = 'This field is required';
    }

    if (nameError.textContent !== '' || emailError.textContent !== '' || messageError.textContent !== '') {
        return;
    }

    const endpoint = 'https://api.web3forms.com/submit';
    const accessKey = '160599cd-bdc1-4c0e-8812-2140ece05961';

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    fetch(endpoint, {
        method: 'POST',
        body: formData,
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Reset the form values after successful submission
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});

function isValidEmail(email) {
    // Use a regular expression to validate the email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}