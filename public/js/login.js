async function send() {
    const username = document.querySelector('.username-text').value
    const password = document.querySelector('.password-text').value

    dataObject = {
        username: username,
        password: password,
    }
    
    const request = new Request('http://localhost:3000/login_handler', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject)
    })
    
    const response = (await fetch(request))

    if (response.status == 200) {
        window.location.replace('http://localhost:3000/')
    }
}


