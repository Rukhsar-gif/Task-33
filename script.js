const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = navLinks.querySelectorAll("a");

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("contactEmail");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formFeedback = document.getElementById("formFeedback");

/* =========================
   MOBILE NAVIGATION
========================= */

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

/* =========================
   CURRENT YEAR
========================= */

document.getElementById("currentYear").textContent =
    `© ${new Date().getFullYear()}`;

/* =========================
   CONTACT FORM VALIDATION
========================= */

function setError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateName() {
    const value = nameInput.value.trim();

    if (!value) {
        setError(nameInput, nameError, "Please enter your name.");
        return false;
    }

    if (value.length < 2) {
        setError(nameInput, nameError, "Name must contain at least 2 characters.");
        return false;
    }

    setError(nameInput, nameError, "");
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        setError(emailInput, emailError, "Please enter your email address.");
        return false;
    }

    if (!emailPattern.test(value)) {
        setError(emailInput, emailError, "Please enter a valid email address.");
        return false;
    }

    setError(emailInput, emailError, "");
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();

    if (!value) {
        setError(messageInput, messageError, "Please enter a message.");
        return false;
    }

    if (value.length < 10) {
        setError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );
        return false;
    }

    setError(messageInput, messageError, "");
    return true;
}

/* Remove errors while users correct the form */

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

/* Validate before accepting form submission */

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const messageIsValid = validateMessage();

    if (!nameIsValid || !emailIsValid || !messageIsValid) {
        formFeedback.textContent = "Please correct the highlighted fields.";
        formFeedback.classList.add("error");

        const firstInvalidField = contactForm.querySelector(".invalid");

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;
    }

    formFeedback.textContent =
        "Validation successful! This frontend demo does not send messages yet.";

    formFeedback.classList.add("success");

    contactForm.reset();

    [nameInput, emailInput, messageInput].forEach((input) => {
        input.classList.remove("invalid");
        input.setAttribute("aria-invalid", "false");
    });

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
});