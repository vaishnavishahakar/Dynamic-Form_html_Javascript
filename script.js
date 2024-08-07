 // calculate age
 function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

// date select and assign age
document.getElementById('dateOfBirth').addEventListener('change', function () {
    const dob = new Date(this.value);
    const age = calculateAge(dob);
    document.getElementById('age').value = age;
});

// Save data to localStorage
function saveData() {
    
    // Enable the age field to include it in the form data
    document.getElementById('age').disabled = false;
    const form = document.getElementById('personalDetails');
    console.log('Form Element:', form);

    const formData = new FormData(form);


    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Form Data:', data);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));

    // Disable the age field again after saving
    document.getElementById('age').disabled = true;
}

// Download CSV file
function downloadCSV() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const headers = [
        'First Name', 'Middle Name', 'Last Name', 'Date of Birth', 'Age',
        'Email Address', 'Address Line 1', 'Address Line 2', 'Landmark', 'City',
        'State', 'Country', 'PIN Code', 'Mobile Number', 'Alternate Mobile Number'
    ];

    const csvContent = [
        [headers.join(',')],
        ...users.map(user => [
            user.firstName, user.middleName, user.lastName, user.dateOfBirth, user.age,
            user.emailAddress, user.addressLine1, user.addressLine2, user.addressLandmark, user.city,
            user.state, user.country, user.pincode, user.mobileNumber, user.alternateMobileNumber
        ])
    ].map(e => e.join(',')).join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'userData.csv';
    a.click();
}

document.getElementById('personalDetails').addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;

    // First Name validation
    const name = document.getElementById('firstName');
    const nameError = document.getElementById('firstNameError');
    if (name.value.trim() === '') {
        nameError.style.display = 'block';
        document.getElementById("firstNameError")
            .innerHTML = "Enter first name";
        valid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Middle Name validation
    const middleName = document.getElementById('middleName');
    const middleNameError = document.getElementById('middleNameError');
    if (middleName.value.trim() === '') {
        middleNameError.style.display = 'block';
        document.getElementById("middleNameError")
            .innerHTML = "Enter middle name";
        valid = false;
    } else {
        middleNameError.style.display = 'none';
    }

    // last Name validation
    const lastName = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameError');
    if (lastName.value.trim() === '') {
        lastNameError.style.display = 'block';
        document.getElementById("lastNameError")
            .innerHTML = "Enter last name";
        valid = false;
    } else {
        lastNameError.style.display = 'none';
    }

    // date of birth validation
    const dateOfBirth = document.getElementById('dateOfBirth');
    const dateOfBirthError = document.getElementById('dateOfBirthError');
    if (dateOfBirth.value.trim() === '') {
        dateOfBirthError.style.display = 'block';
        document.getElementById("dateOfBirthError")
            .innerHTML = "Enter date of birth";
        valid = false;
    } else {
        dateOfBirthError.style.display = 'none';
    }

    // age validation
    const age = document.getElementById('age');
    const ageError = document.getElementById('ageError');
    if (age.value.trim() === '') {
        ageError.style.display = 'block';
        document.getElementById("ageError")
            .innerHTML = "Enter age";
        valid = false;
    } else {
        ageError.style.display = 'none';
    }

    // Email validation
    const email = document.getElementById('emailAddress').value.trim();
    const emailError = document.getElementById('emailAddressError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '') {
        emailError.style.display = 'block';
        document.getElementById("emailAddressError").innerHTML = "Enter email address";
        valid = false;
    } else {
        emailError.style.display = 'none';

        if (!emailPattern.test(email)) {
            console.log(email)
            emailError.style.display = 'block';
            document.getElementById("emailAddressError").innerHTML = "Email is not valid. Must be in the format: user@example.com";
            valid = false;
        } else {
            emailError.style.display = 'none';

            const domain = email.split('@')[1];
            if (!domainPattern.test(domain)) {
                console.log(email)
                emailError.style.display = 'block';
                document.getElementById("emailAddressError").innerHTML = "Email domain is invalid. Must be a valid domain (e.g., example.com)";
                valid = false;
            } else {
                emailError.style.display = 'none';
            }
        }
    }

    // addressLine1 validation
    const addressLine1 = document.getElementById('addressLine1');
    const addressLine1Error = document.getElementById('addressLine1Error');
    if (addressLine1.value.trim() === '') {
        addressLine1Error.style.display = 'block';
        document.getElementById("addressLine1Error")
            .innerHTML = "Enter address line 1";
        valid = false;
    } else {
        addressLine1Error.style.display = 'none';
    }

    // aadressLine2 validation
    const addressLine2 = document.getElementById('addressLine2');
    const addressLine2Error = document.getElementById('addressLine2Error');
    if (addressLine2.value.trim() === '') {
        addressLine2Error.style.display = 'block';
        document.getElementById("addressLine2Error")
            .innerHTML = "Enter address line 2";
        valid = false;
    } else {
        addressLine2Error.style.display = 'none';
    }

    // landmark validation
    const addressLandmark = document.getElementById('addressLandmark');
    const addressLandmarkError = document.getElementById('addressLandmarkError');
    if (addressLandmark.value.trim() === '') {
        addressLandmarkError.style.display = 'block';
        document.getElementById("addressLandmarkError")
            .innerHTML = "Enter address landmark";
        valid = false;
    } else {
        addressLandmarkError.style.display = 'none';
    }

    // city validation
    const city = document.getElementById('city');
    const cityError = document.getElementById('cityError');
    if (city.value.trim() === '') {
        cityError.style.display = 'block';
        document.getElementById("cityError")
            .innerHTML = "Enter city ";
        valid = false;
    } else {
        cityError.style.display = 'none';
    }

    // state validation
    const state = document.getElementById('state');
    const stateError = document.getElementById('stateError');
    if (state.value.trim() === '') {
        stateError.style.display = 'block';
        document.getElementById("stateError")
            .innerHTML = "Enter state";
        valid = false;
    } else {
        stateError.style.display = 'none';
    }

    // country validation
    const country = document.getElementById('country');
    const countryError = document.getElementById('countryError');
    if (country.value.trim() === '') {
        countryError.style.display = 'block';
        document.getElementById("countryError")
            .innerHTML = "Enter country";
        valid = false;
    } else {
        countryError.style.display = 'none';
    }

    // pincode validation
    const pincode = document.getElementById('pincode').value.trim();
    const pincodeError = document.getElementById('pincodeError');
    const pincodePattern = /^[1-9][0-9]{5}$/;

    if (!pincodePattern.test(pincode)) {
        pincodeError.style.display = 'block';
        document.getElementById('pincodeError').innerText = 'Pincode must be 6 digits.';
        isValid = false;
    }
    else {
        pincodeError.style.display = 'none';
    }

    // mobileNumber validation
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const mobileNumberError = document.getElementById('mobileNumberError');
    const mobileNumberPattern = /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;

    if (!mobileNumberPattern.test(mobileNumber)) {
        mobileNumberError.style.display = 'block';
        document.getElementById('mobileNumberError').innerText = 'Mobile number must be 10 digits.';
        isValid = false;
    } else {
        mobileNumberError.style.display = 'none';
    }

    // alternateMobileNumber validation
    const alternateMobileNumber = document.getElementById('alternateMobileNumber').value.trim();
    const alternateMobileNumberError = document.getElementById('alternateMobileNumberError');
    const alternateMobileNumberPattern = /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;


    if (!alternateMobileNumberPattern.test(alternateMobileNumber)) {
        alternateMobileNumberError.style.display = 'block';
        document.getElementById('alternateMobileNumberError').innerText = 'Mobile number must be 10 digits.';
        isValid = false;
    } else {
        alternateMobileNumberError.style.display = 'none';
    }

    if (valid) {
        saveData();
        document.getElementById('personalDetails').reset();
    }
});

document.querySelector('.download-btn').addEventListener('click', function () {
    downloadCSV();
});
