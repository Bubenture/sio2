// transition
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('#services');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const url = `/application?id=${id}`;
            window.location.href = url;
        });
    });
});

// Slides
function startSlideShow(container) {
    let slides = container.querySelectorAll('.slide');
    let slideIndex = container.slideIndex;
    const slideInterval = setInterval(() => {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        slides[slideIndex].classList.add('active');
        container.slideIndex = slideIndex;
    }, 4000);
    return slideInterval;
}

function plusSlides(container, n) {
    clearInterval(container.slideInterval);
    container.slideIndex += n;
    const slides = container.querySelectorAll('.slide');
    if (container.slideIndex >= slides.length) {
        container.slideIndex = 0;
    } else if (container.slideIndex < 0) {
        container.slideIndex = slides.length - 1;
    }
    slides.forEach(slide => slide.classList.remove('active'));
    slides[container.slideIndex].classList.add('active');
    container.slideInterval = startSlideShow(container);
}

document.querySelectorAll('.slider-container').forEach(container => {
    const slides = container.querySelectorAll('.slide');
    container.slideIndex = slides.length - 1;  // Начинаем с последнего слайда
    slides[container.slideIndex].classList.add('active');
    container.slideInterval = startSlideShow(container);
});


// application button 
const submitButton = document.getElementById('submit-button');
const firstNameInput = document.getElementById('first_name');
const phoneInput = document.getElementById('phone');
const connectionInput = document.getElementById('connection');
const passwordError = document.getElementById('password-error');
const okButton = document.getElementById('ok-button');

firstNameInput.addEventListener('input', checkFormValidity);
phoneInput.addEventListener('input', checkFormValidity);
connectionInput.addEventListener('input', checkFormValidity);

function checkFormValidity() {
    if (firstNameInput.value.trim() === "" ||
        !phoneInput.value.trim().match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)) {
        passwordError.style.display = 'inline';
        submitButton.style.display = 'none';
        submitButton.removeAttribute('type');
        return;
    }

    passwordError.style.display = 'none';
    submitButton.style.display = 'inline';
    submitButton.setAttribute('type', 'submit');
}

phoneInput.addEventListener('keydown', function(event) {
    if (submitButton.style.display === 'inline') {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
});

// modal window
firstNameInput.addEventListener('input', checkFormValidity);
phoneInput.addEventListener('input', checkFormValidity);
connectionInput.addEventListener('input', checkFormValidity);

document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.getElementById('submit-button');
    var modal = document.getElementById('modal');
    var overlay = document.getElementById('overlay');
    var okButton = document.getElementById('ok-button');
    var data = document.getElementById('data');
    

    submitButton.addEventListener('click', function() {
        data.style.display = 'none';
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    okButton.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
});

// number mask
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');
    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        inputNumbersValue = inputNumbersValue.replace(/^8/, '7');
        formattedInputValue = '+7 ';

        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }

        input.value = formattedInputValue;
    }

    var onPhoneKeyDown = function (e) {
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }

    var onPhonePaste = function (e) {
        e.preventDefault();
    }

    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false); 
    }
})





