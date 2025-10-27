let seconds = 0;
let timerInterval;
const timer = document.getElementById('timer');
const form = document.getElementById('surveyForm');
const surveySection = document.getElementById('surveySection');
const confirmBtn = document.getElementById('confirmNameBtn');
const nameField = document.getElementById('fullname');

// Step 1: Wait for "Confirm Name"
confirmBtn.addEventListener('click', () => {
    if (nameField.value.trim() === "") {
        alert("Please enter your full name first.");
        return;
    }

    // Lock name input
    nameField.readOnly = true;
    confirmBtn.style.display = "none";

    // Start timer (hidden but active)
    timerInterval = setInterval(() => {
        seconds++;
    }, 1000);

    // Show survey section
    surveySection.style.display = "block";
});

// Step 2: Handle submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearInterval(timerInterval);

    const formData = {
        name: nameField.value,
        buy: form.buy.value,
        time: seconds
    };

    const scriptURL = "https://script.google.com/macros/s/AKfycbzyxsfxiCXUMe32yzdciVZoBQIZP0p9tUc_XRuSB_EKDqXv3auz6Ny2ZBO4x2rtiy1KXg/exec";
    const redirectURL = "https://forms.gle/YHiB3pNsAbtbXmRa7"; // post-survey link

    try {
        await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        // Redirect to post-survey after submission
        window.location.href = redirectURL;

    } catch (error) {
        alert("There was an error submitting your response.");
        console.error(error);
    }
});