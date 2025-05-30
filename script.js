document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.getElementById('userTableBody');
    const errorMessagesDiv = document.getElementById('errorMessages');

    const USERS_STORAGE_KEY = 'registeredUsers';

    // Function to load users from local storage
    const loadUsers = () => {
        const usersJSON = localStorage.getItem(USERS_STORAGE_KEY);
        return usersJSON ? JSON.parse(usersJSON) : [];
    };

    // Function to save users to local storage
    const saveUsers = (users) => {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    };

    // Function to validate form data
    const validateForm = (name, email, password, dob, acceptTerms) => {
        const errors = [];
        if (!name.trim()) errors.push("Name is required.");
        if (!email.trim()) {
            errors.push("Email is required.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Invalid email format.");
        }
        if (!password) {
            errors.push("Password is required.");
        } else if (password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
        }
        if (!dob) {
            errors.push("Date of Birth is required.");
        } else {
            // Age validation (e.g., must be at least 18)
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                errors.push("You must be at least 18 years old to register.");
            }
        }
        if (!acceptTerms) errors.push("You must accept the Terms and Conditions.");

        return errors;
    };

    // Function to display error messages
    const displayErrors = (errors) => {
        errorMessagesDiv.innerHTML = ''; // Clear previous errors
        if (errors.length > 0) {
            const ul = document.createElement('ul');
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                ul.appendChild(li);
            });
            errorMessagesDiv.appendChild(ul);
            errorMessagesDiv.style.display = 'block'; // Show error messages
        } else {
            errorMessagesDiv.style.display = 'none'; // Hide if no errors
        }
    };

    // Function to update the table with user data
    const updateUserTable = () => {
        const users = loadUsers();
        userTableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell().textContent = user.name;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.password; // Note: Displaying password is not secure for real apps!
            row.insertCell().textContent = user.dob;
            row.insertCell().textContent = user.acceptTerms ? 'Yes' : 'No';
        });
    };

    // Event listener for form submission
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Capture form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validate data
        const validationErrors = validateForm(name, email, password, dob, acceptTerms);
        displayErrors(validationErrors);

        if (validationErrors.length === 0) {
            // If valid, create user object
            const newUser = { name, email, password, dob, acceptTerms };

            // Get existing users, add new one, and save
            const users = loadUsers();
            users.push(newUser);
            saveUsers(users);

            // Update the table
            updateUserTable();

            // Clear the form
            registrationForm.reset();
            alert('Registration successful!');
        }
    });

    // Initial load of users into the table when the page loads
    updateUserTable();
    errorMessagesDiv.style.display = 'none'; // Hide error div initially
});