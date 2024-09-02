let form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateInputs()) { 
        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
            })
        }).then((response) => {
            if(response.status == 200){
                console.log(response);
                window.sessionStorage.setItem('user', `${document.getElementById('email').value}`);
                window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html')
            }
            else if(response.status == 421){
                alert('Invalid Username Pass')
            }
            else if(response.status === 420){
                alert('Email Doesnt Exist')
            }
        
        })
    } else {
        console.log('internal error');;
    }
});

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    if(email.trim() === ''){
        emailError.innerText = 'Enter your email!'
        isValid = false;
    } else if(!isValidEmail(email)){
        emailError.textContent = 'Enter valid email'
        isValid = false;
    }
    else{
        emailError.textContent = ''
    }

    if(password.trim() === ''){
        passwordError.textContent = 'Enter your password'
        isValid = false;
    } else if(password.trim().length < 8){
        passwordError.textContent = 'Enter valid password'
        isValid = false;
    } else{
        passwordError.textContent = '';
    }

    return isValid;
};

const signup = document.getElementById('signup')
signup.addEventListener('click',function(){
    window.location.replace('http://127.0.0.1:5500/client/Signup/signup.html')
})