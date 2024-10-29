function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function validateAndHashForm() {
    document.getElementById('address').value = sanitizeInput(document.getElementById('address').value);
    document.getElementById('email').value = sanitizeInput(document.getElementById('email').value);
    document.getElementById('phone-num').value = sanitizeInput(document.getElementById('phone-num').value);

 
    const phone = document.getElementById('phone-num').value;
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }


    const passwordField = document.getElementById('password');
    passwordField.value = sha256(passwordField.value);

    return true;
}


async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}