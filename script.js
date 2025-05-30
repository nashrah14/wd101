document.getElementById('dob').addEventListener('change', function () {
    let dob = new Date(this.value);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    
    let monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Your age must be between 18 and 55 years.");
        this.value = "";
    }
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let acceptedTerms = document.getElementById('terms').checked;

    let user = { name, email, password, dob, acceptedTerms };
    localStorage.setItem(email, JSON.stringify(user));

    displayUsers();
    this.reset();
});

function displayUsers() {
    let tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = "";

    Object.keys(localStorage).forEach(key => {
        let user = JSON.parse(localStorage.getItem(key));
        let row = tbody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.acceptedTerms ? "true" : "false";
    });
}

window.onload = displayUsers;
