// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                document.getElementById('loginMessage').textContent = 'Login successful!';
                window.location.href = 'html/home.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Invalid username or password.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loginMessage').textContent = 'An error occurred. Please try again later.';
        });
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                document.getElementById('signupMessage').textContent = 'Username already exists.';
            } else {
                const newUser = { username: username, password: password };

                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(response => response.json())
                .then(user => {
                    document.getElementById('signupMessage').textContent = 'Signup successful!';
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('signupMessage').textContent = 'An error occurred. Please try again later.';
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('signupMessage').textContent = 'An error occurred. Please try again later.';
        });
});

  