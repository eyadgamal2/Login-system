
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let email = document.getElementById('register-email').value;
        let password = document.getElementById('register-password').value;
        let name = document.getElementById('register-name').value;

        let errorMessages = document.getElementById('register-error');

    
        if (!email || !password || !name) {
            errorMessages.innerHTML = "Email , Password and Name are required!";
            return;
        }

        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!regex.test(email)){
            errorMessages.innerHTML = "Email is not correct!";
            return;
        }


        let users = JSON.parse(localStorage.getItem('users')) || [];

    
        var user = users.find(function(u){
            return u.email == email
        })
        if (user) {
            errorMessages.innerHTML = "Email is already registered. Try another one.";
            return;
        }

        var newUser = {
            email : email,
            password: password ,
            name:name
        }

    
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        
        window.location.href = "login.html";
    });
}


if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let errorMessages = document.getElementById('errorMessages');

        
        if (!email || !password) {
            errorMessages.innerHTML = "Email and Password are required!";
            return;
        }


        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(function(u){
            return u.email === email && u.password === password
        });

        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            errorMessages.innerHTML = "Invalid email or password!";
        }
    });
}

if (document.getElementById('welcome-message')) {
    window.onload = function() {
        let user = JSON.parse(sessionStorage.getItem('user'));

        if (!user) {
            
            window.location.href = "login.html";
        } else {
        
            document.getElementById('welcome-message').innerHTML = `${user.name}!`;
        }

    
        document.getElementById('logout').addEventListener('click', function() {
            sessionStorage.removeItem('user');
            window.location.href = "login.html";
        });
    };
}

