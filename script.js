window.onload = function () {
  const form = document.getElementById('registrationForm');
  const tableBody = document.querySelector('#userTable tbody');

  // Load users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  renderTable();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate DOB (age between 18 and 55)
    if (!isValidAge(dob)) {
      alert('Age must be between 18 and 55 years.');
      return;
    }

    const user = { name, email, password, dob, terms };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
    form.reset();
  });

  function isValidAge(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age >= 18 && age <= 55;
  }

  function renderTable() {
    tableBody.innerHTML = '';
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms ? 'true' : 'false'}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
};