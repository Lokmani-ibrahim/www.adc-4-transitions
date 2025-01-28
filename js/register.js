const form = document.getElementById("validation");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const adress = document.getElementById("adress").value;
    const postalCode = document.getElementById("postalCode").value;
    const phone = document.getElementById("phone").value;
    const studyLevel = document.getElementById("studyLevel").value;
    const frenchLevel = document.getElementById("frenchLevel").value;
    const englishLevel = document.getElementById("englishLevel").value;
    const experience = document.getElementById("experience").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    let isValid = true;
    document.getElementById("tname").textContent = "";
    document.getElementById("tsurname").textContent = "";
    document.getElementById("tadress").textContent = "";
    document.getElementById("tpostalCode").textContent = "";
    document.getElementById("tphone").textContent = "";
    document.getElementById("tstudyLevel").textContent = "";
    document.getElementById("tfrenchLevel").textContent = "";
    document.getElementById("tenglishLevel").textContent = "";
    document.getElementById("texperience").textContent = "";
    document.getElementById("temail").textContent = "";
    document.getElementById("tpassword").textContent = "";
    document.getElementById("trepeatPassword").textContent = "";

    const nameRegex = /^[a-zA-Z]{3,30}$/;
    if (name == "") {
        document.getElementById("tname").textContent = 
            "Name is required!";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById("tname").textContent = 
            "Name must be 3-30 letters.";
        isValid = false;
    }
    if (surname == "") {
        document.getElementById("tsurname").textContent = 
            "Surname is required!";
        isValid = false;
    } else if (!nameRegex.test(surname)) {
        document.getElementById("tsurname").textContent = 
            "Surname must be 3-30 letters.";
        isValid = false;
    }
    if (adress == "") {
        document.getElementById("tadress").textContent = 
            "Adress is required!";
        isValid = false;
    }
    const postalCodeRegex = /^[0-9]{4}$/;
    if (postalCode == "") {
        document.getElementById("tpostalCode").textContent = 
            "Postal code is required!";
        isValid = false;
    } else if (!postalCodeRegex.test(postalCode)) {
        document.getElementById("tpostalCode").textContent = 
            "Postal code must be 4 numbers.";
        isValid = false;
    }
    const phoneRegex = /^[0-9]{8}$/;
    if (phone == "") {
        document.getElementById("tphone").textContent = 
            "Phone is required!";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById("tphone").textContent = 
            "Phone must be 8 digits.";
        isValid = false;
    }
    if (studyLevel == "") {
        document.getElementById("tstudyLevel").textContent = 
            "Study level is required!";
        isValid = false;
    }
    if (frenchLevel == "") {
        document.getElementById("tfrenchLevel").textContent = 
            "French level is required!";
        isValid = false;
    }
    if (englishLevel == "") {
        document.getElementById("tenglishLevel").textContent = 
            "English level is required!";
        isValid = false;
    }
    if (experience == "") {
        document.getElementById("texperience").textContent = 
            "Experience is required!";
        isValid = false;
    }
    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
    if (email == "") {
        document.getElementById("temail").textContent = 
            "Email is required!";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("temail").textContent = 
            "Invalid email address.";
        isValid = false;
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password == "") {
        document.getElementById("tpassword").textContent = 
            "Password is required!";
        isValid = false;
    } else if (!passRegex.test(password)) {
        document.getElementById("tpassword").textContent = 
            "Password must have 8+ chars, 1 lowercase, 1 uppercase, 1 number.";
        isValid = false;
    }
    if (repeatPassword == "") {
        document.getElementById("trepeatPassword").textContent = 
            "Repeat password is required!";
        isValid = false;
    } else if (password !== repeatPassword) {
        document.getElementById("trepeatPassword").textContent = 
            "Passwords do not match!";
        isValid = false;
    }
    if (isValid) {
        alert("Form submitted successfully!");
    }
});