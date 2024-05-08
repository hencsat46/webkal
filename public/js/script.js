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
        const image = document.createElement('img')
        image.src = 'http://localhost:3000/public/img/profilelogo.png'
        profile.append(image)
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
