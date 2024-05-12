async function sendCookie() {
    let tokenString = getCookie().token
    if (tokenString == undefined) {
        tokenString = ''
    }
    const request = new Request('http://localhost:3000/auth', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Token': tokenString,
        }
    })
    console.log(request)
    const response = await fetch(request)

    if (response.status == 200) {
        const login = document.querySelector('.login')
        login.style.display = 'none'
        const profile = document.querySelector('div.profile-pic')
        const imageWrapper = document.createElement('a')
        imageWrapper.classList.add('img-wrapper')
        imageWrapper.setAttribute('onclick', 'toProfile()')
        const image = document.createElement('img')
        image.src = 'http://localhost:3000/public/img/profilelogo.png'
        imageWrapper.append(image)
        profile.append(imageWrapper)
    }
}

sendCookie()

function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
}

async function toProfile() {
    let tokenString = getCookie().token
    console.log("hello")
    if (tokenString == undefined) {
        tokenString = ''
    }
    const request = new Request('http://localhost:3000/profile', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Token': tokenString,
        }
    })

    const response = await fetch(request)

    if (response.status == 200) {
        window.location.replace('http://localhost:3000/profile')
    }
}