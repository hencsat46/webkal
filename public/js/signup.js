async function signup() {
    const username = document.querySelector('.username-text').value
    const passwords = document.querySelectorAll('.password-text')
    const error = document.querySelector('.error')

    const data = {
        username: username,
        password: passwords[0].value,
    }

    if (passwords[0].value != passwords[1].value) {
        error.style.display = 'block'
        return
    } else {
        error.style.display = 'none'
    }

    console.log(data)

    const request = new Request('http://localhost:3000/signup_handler/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const response = await fetch(request)

    if (response.status == 200) {
        document.querySelector('.exists').style.display = 'none'
        const request = new Request('http://localhost:3000/login_handler/', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const response = await fetch(request)
        if (response.status == 200) {
            window.location.replace('http://localhost:3000/')
        }
        
    } else {
        if (response.status == 400) {
            document.querySelector('.exists').style.display = 'block'
        }
    }

}