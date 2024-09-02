if (sessionStorage.getItem('user') === null) {
    window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
}

const saveBtn = document.getElementById('save');
saveBtn.addEventListener("click", function(event){
    event.preventDefault()
    if(validateInputsOfPage()){
        save();
    }
})

const cancelBtn = document.getElementById('cancel')
cancelBtn.addEventListener("click", cancel)

function cancel(){
    window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html')
}

function logout() {
    window.sessionStorage.setItem('user', null);
    window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
}

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);

function save() {
    const payload = {
        title: document.getElementById('title').value,
        subText: document.getElementById('subText').value,
        body : tinymce.activeEditor.getContent({ format: 'html' }),
        url: document.getElementById('url').value,
        author: document.getElementById('author').value,
        showAuthor: document.getElementById('showAuthor').checked,
        blogStatus: 'Draft',
        owner: window.sessionStorage.getItem('user')
    }
    console.log(payload)
    fetch('http://localhost:5000/blog/addBlog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        if (response.ok) {
            alert('New Post Saved as Draft')
            window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html')
        }
        else{
            alert('Some error Occured')
        }

    }).catch((err) => {
        console.log(err)
    })
}

function redirectOnDashboard() {
    window.sessionStorage.setItem('user', null);
    window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html');
}
const dashBoardBtn = document.getElementById('dashboard');
dashBoardBtn.addEventListener('click', redirectOnDashboard);

function validateLinkName(link) {
    var pattern = /^\/[a-zA-Z][a-zA-Z0-9_]*$/;
    return pattern.test(link);
}

function validateInputsOfPage(){
    const title = document.getElementById('title').value
    const subText = document.getElementById('subText').value
    const url = document.getElementById('url').value;

    const titleErr = document.getElementById('titleErr')
    const subTextErr = document.getElementById('subTxrErr')
    const urlErr = document.getElementById('urlErr')

    let isValid = true;
    
    if(title === ''){
        titleErr.textContent = 'Enter your title!'
        isValid = false;
    } else{
        titleErr.textContent = ''
    }

    if(subText === ''){
        subTextErr.textContent = 'Enter your sub-text!'
        isValid = false;
    } else{
        subText.textContent = ''
    }

    if(url === ''){
        urlErr.textContent = 'Enter your url!'
        isValid = false;
    } else if(!validateLinkName(url)){
        urlErr.textContent = 'Please enter valid url (eg: /nishil)';
        isValid = false
    }
    else{
        urlErr.textContent = ''
    }

    return isValid;
}



