const express = require('express')
const methods = require('methods')
const path = require('path')
const router = express.Router()
const cors = require('cors')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const mongo = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser(process.env.cookie_secret))
dotenv.config()
mongo.connect(process.env.mongo_url)
const db = mongo.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to mongodb"))


authCors = {
    origin: 'http://localhost:3000/login',
    origin: 'http://localhost:3000/signup',
    methods: 'POST',
}

mainCors = {
    origin: 'http://localhost:3000/',
    methods: 'GET',
}

router.get('/', async (req, res) => {
    const clothes = await db.collection('clothes').find().sort({ date: -1 }).limit(12).toArray()
    const shoes = await db.collection('shoes').find().sort({ date: -1 }).limit(12).toArray()

    const clothesArray = sortData(clothes)
    const shoesArray = sortData(shoes)

    for (let i = 0; i < shoesArray.length; i++) {
        clothesArray.push(shoesArray[i])
    }

    res.render('index', {clothesArray: clothesArray})
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/data_clothes', async (req, res) => {
  const clothesData = [
    {
        "name": "Футболка",
        "description": "Удобная футболка для повседневного использования",
        "date": new Date(),
        "img": "1.jpg",
        "category": "clothes"
    },
    {
        "name": "Джинсы",
        "description": "Классические джинсы с прямым кроем",
        "date": new Date(),
        "img": "2.jpg",
        "category": "clothes"
    },
    {
        "name": "Платье",
        "description": "Элегантное платье для особых случаев",
        "date": new Date(),
        "img": "3.jpg",
        "category": "clothes"
    },
    {
        "name": "Шорты",
        "description": "Легкие шорты для лета",
        "date": new Date(),
        "img": "4.jpg",
        "category": "clothes"
    },
    {
        "name": "Рубашка",
        "description": "Стильная рубашка для офиса",
        "date": new Date(),
        "img": "5.jpg",
        "category": "clothes"
    },
    {
        "name": "Пиджак",
        "description": "Классический пиджак для торжественных мероприятий",
        "date": new Date(),
        "img": "6.jpg",
        "category": "clothes"
    },
    {
        "name": "Свитер",
        "description": "Теплый свитер для холодных дней",
        "date": new Date(),
        "img": "7.jpg",
        "category": "clothes"
    },
    {
        "name": "Юбка",
        "description": "Элегантная юбка для женщин",
        "date": new Date(),
        "img": "8.jpg",
        "category": "clothes"
    },
    {
        "name": "Куртка",
        "description": "Спортивная куртка для активного отдыха",
        "date": new Date(),
        "img": "9.jpg",
        "category": "clothes"
    },
    {
        "name": "Пальто",
        "description": "Пальто для холодной погоды",
        "date": new Date(),
        "img": "10.jpg",
        "category": "clothes"
    },
    {
        "name": "Блузка",
        "description": "Легкая блузка для женщин",
        "date": new Date(),
        "img": "11.jpg",
        "category": "clothes"
    },
    {
        "name": "Толстовка",
        "description": "Теплая толстовка для спорта",
        "date": new Date(),
        "img": "12.jpg",
        "category": "clothes"
    },
    {
        "name": "Брюки",
        "description": "Повседневные брюки для мужчин",
        "date": new Date(),
        "img": "13.jpg",
        "category": "clothes"
    },
    {
        "name": "Шарф",
        "description": "Мягкий шарф для защиты от холода",
        "date": new Date(),
        "img": "14.jpg",
        "category": "clothes"
    },
    {
        "name": "Пиджама",
        "description": "Уютная пиджама для сна",
        "date": new Date(),
        "img": "15.jpg",
        "category": "clothes"
    },
    {
        "name": "Пальто",
        "description": "Теплое пальто для холодной погоды",
        "date": new Date(),
        "img": "16.jpg",
        "category": "clothes"
    },
    {
        "name": "Спортивные штаны",
        "description": "Удобные спортивные штаны для активного отдыха",
        "date": new Date(),
        "img": "17.jpg",
        "category": "clothes"
    },
    {
        "name": "Бермуды",
        "description": "Летние бермуды для отдыха на пляже",
        "date": new Date(),
        "img": "18.jpg",
        "category": "clothes"
    },
    {
        "name": "Кепка",
        "description": "Стильная кепка для защиты от солнца",
        "date": new Date(),
        "img": "19.jpg",
        "category": "clothes"
    },
    {
        "name": "Свадебное платье",
        "description": "Элегантное свадебное платье для невесты",
        "date": new Date(),
        "img": "20.jpg",
        "category": "clothes"
    },
    {
        "name": "Костюм",
        "description": "Официальный костюм для деловых встреч",
        "date": new Date(),
        "img": "21.jpg",
        "category": "clothes"
    },
    {
        "name": "Платье",
        "description": "Летнее платье для женщин",
        "date": new Date(),
        "img": "22.jpg",
        "category": "clothes"
    },
    {
        "name": "Костюм",
        "description": "Костюм для праздничных мероприятий",
        "date": new Date(),
        "img": "23.jpg",
        "category": "clothes"
    },
    {
        "name": "Спортивная футболка",
        "description": "Футболка для занятий спортом",
        "date": new Date(),
        "img": "24.jpg",
        "category": "clothes"
    },
    {
        "name": "Шарф",
        "description": "Теплый шарф для холодных дней",
        "date": new Date(),
        "img": "25.jpg",
        "category": "clothes"
    },
    {
        "name": "Куртка",
        "description": "Удобная куртка для повседневного использования",
        "date": new Date(),
        "img": "26.jpg",
        "category": "clothes"
    },
    {
        "name": "Шорты",
        "description": "Шорты для пляжного отдыха",
        "date": new Date(),
        "img": "27.jpg",
        "category": "clothes"
    },
    {
        "name": "Рубашка",
        "description": "Рубашка для официальных мероприятий",
        "date": new Date(),
        "img": "28.jpg",
        "category": "clothes"
    }
  ];

    const result = await db.collection('clothes').insertMany(clothesData)
    res.sendStatus(200)
})

router.get('/shoes', async (req, res) => {
    const clothes = await db.collection('shoes').find({}).toArray()

    const clothesArray = sortData(clothes)
    
    res.render('shoes', {clothesArray: clothesArray})
})

router.get('/data_shoes', async (req, res) => {
    
  const shoesData = [
    {
        "name": "Кроссовки",
        "description": "Спортивная обувь для занятий спортом",
        "date": new Date(),
        "img": "1.jpg",
        "category": "shoes"
    },
    {
        "name": "Туфли",
        "description": "Элегантные туфли для особых случаев",
        "date": new Date(),
        "img": "2.jpg",
        "category": "shoes"
    },
    {
        "name": "Ботинки",
        "description": "Удобные ботинки для повседневной носки",
        "date": new Date(),
        "img": "3.jpg",
        "category": "shoes"
    },
    {
        "name": "Сапоги",
        "description": "Теплые сапоги для холодной погоды",
        "date": new Date(),
        "img": "4.jpg",
        "category": "shoes"
    },
    {
        "name": "Сандалии",
        "description": "Легкие сандалии для летнего отдыха",
        "date": new Date(),
        "img": "5.jpg",
        "category": "shoes"
    },
    {
        "name": "Кеды",
        "description": "Универсальная обувь для повседневного использования",
        "date": new Date(),
        "img": "6.jpg",
        "category": "shoes"
    },
    {
        "name": "Эспадрильи",
        "description": "Стильная обувь для летних прогулок",
        "date": new Date(),
        "img": "7.jpg",
        "category": "shoes"
    },
    {
        "name": "Лоферы",
        "description": "Комфортная обувь для стильного образа",
        "date": new Date(),
        "img": "8.jpg",
        "category": "shoes"
    },
    {
        "name": "Мокасины",
        "description": "Элегантные мокасины для мужчин",
        "date": new Date(),
        "img": "9.jpg",
        "category": "shoes"
    },
    {
        "name": "Балетки",
        "description": "Легкая и удобная обувь для женщин",
        "date": new Date(),
        "img": "10.jpg",
        "category": "shoes"
    },
    {
        "name": "Полуботинки",
        "description": "Классическая обувь для формальных мероприятий",
        "date": new Date(),
        "img": "11.jpg",
        "category": "shoes"
    },
    {
        "name": "Оксфорды",
        "description": "Официальная обувь для деловых встреч",
        "date": new Date(),
        "img": "12.jpg",
        "category": "shoes"
    },
    {
        "name": "Дерби",
        "description": "Мужская обувь для повседневного использования",
        "date": new Date(),
        "img": "13.jpg",
        "category": "shoes"
    },
    {
        "name": "Мюли",
        "description": "Стильная обувь для женщин",
        "date": new Date(),
        "img": "14.jpg",
        "category": "shoes"
    },
    {
        "name": "Броги",
        "description": "Элегантная обувь для мужчин",
        "date": new Date(),
        "img": "15.jpg",
        "category": "shoes"
    },
    {
        "name": "Котофей",
        "description": "Удобная детская обувь",
        "date": new Date(),
        "img": "16.jpg",
        "category": "shoes"
    },
    {
        "name": "Галоши",
        "description": "Защитная обувь от дождя",
        "date": new Date(),
        "img": "17.jpg",
        "category": "shoes"
    },
    {
        "name": "Валенки",
        "description": "Теплая обувь для холодной зимы",
        "date": new Date(),
        "img": "18.jpg",
        "category": "shoes"
    },
    {
        "name": "Классики",
        "description": "Классическая обувь для стильного образа",
        "date": new Date(),
        "img": "19.jpg",
        "category": "shoes"
    },
    {
        "name": "Сланцы",
        "description": "Легкие и удобные шлепанцы для пляжа",
        "date": new Date(),
        "img": "20.jpg",
        "category": "shoes"
    },
    {
        "name": "Элегант",
        "description": "Обувь для особых случаев",
        "date": new Date(),
        "img": "21.jpg",
        "category": "shoes"
    },
    {
        "name": "Кеды Converse",
        "description": "Классические кеды для повседневной носки",
        "date": new Date(),
        "img": "22.jpg",
        "category": "shoes"
    },
    {
        "name": "Босоножки",
        "description": "Легкая и воздушная обувь для лета",
        "date": new Date(),
        "img": "23.jpg",
        "category": "shoes"
    },
    {
        "name": "Рабочая обувь",
        "description": "Прочная обувь для работы",
        "date": new Date(),
        "img": "24.jpg",
        "category": "shoes"
    },
    {
        "name": "Кеды Vans",
        "description": "Стильные кеды для молодежи",
        "date": new Date(),
        "img": "25.jpg",
        "category": "shoes"
    }
  ];

    const result = await db.collection('shoes').insertMany(shoesData)
    res.sendStatus(200)
        
})

router.get('/clothes', async (req, res) => {
    const clothes = await db.collection('clothes').find({}).toArray()

    const clothesArray = sortData(clothes)
    
    res.render('clothes', {clothesArray: clothesArray})
})


function sortData(array) {

    const clothesLength = Math.ceil(array.length / 3)
    let clothesArray = new Array()
    for (let i = 0; i < clothesLength; i++) {
        clothesArray.push(new Array())
        for (let j = 0; j < 3; j++) {
            if (3 * i + j < array.length)
                clothesArray[i].push(array[3 * i + j])
        }
    }

    return clothesArray
}



router.post('/login_handler', cors(authCors), async (req, res) => {
    
    const password = req.body.password

    const result = await db.collection('users').findOne({username: req.body.username})
    
    if (password == result.password) {
        const token = generateToken(req.body.username)
        res.cookie('token', token)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})

router.post('/signup_handler', cors(authCors), async (req, res) => {
    const body = req.body
    const data = {
        username: body.username,
        password: body.password,
    }

    const count = await db.collection('users').countDocuments({username: data.username})
    
    if (count > 0) {
        return res.sendStatus(400)
    }
    
    const result = await db.collection('users').insertOne(data)
    console.log(result)
    res.sendStatus(200)

})

router.get('/auth', cors(mainCors), (req, res) => {
    
    const token = req.headers['token']
    if (token == '') 
        return res.sendStatus(401)
    else {
        jwt.verify(token, process.env.jwt_secret, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            res.sendStatus(200)
        })
    }
    
})

router.use('/profile', (req, res, next) => {
    const cookie = req.headers.cookie
    if (cookie == undefined) {

        return res.redirect('/')
    }
    const token = cookie.substring(cookie.indexOf('=') + 1)
    jwt.verify(token, process.env.jwt_secret, (err, user) => {
        console.log(err)
        if (err) {
            return res.redirect('/')
        } else {
            next()
        }
    })
})

router.get('/profile', async (req, res) => {

    const cookie = req.headers.cookie

    const username = getUsername(cookie)
    const result = await db.collection('users').findOne({username: username})

    const userData = {
        username: result.username,
        name: result.name,
        surname: result.surname,
        patronomyc: result.patronomyc,
        phone: result.phone,
    }

    console.log(userData)

    res.render('profile', {userData: userData})
})

router.put('/update_handler', async (req, res) => {
    const data = req.body
    const username = getUsername(req.headers.cookie)

    const updates = {
        $set: { 
            name: data.name,
            surname: data.surname,
            patronomyc: data.patronomyc,
            phone: data.phone
        }
    }

    const result = await db.collection('users').updateOne({ username: username }, updates)

    if (result.acknowledged) {
        res.sendStatus(200)
    }
})

function getUsername(cookie) {
    return jwt.decode(cookie.substring(cookie.indexOf('=') + 1)).username
}

function generateToken(username) {
    return jwt.sign({username: username}, process.env.jwt_secret, {expiresIn:'1800s'})
}

router.use((req, res, next) => { 
    res.status(404).render('404')
}) 


module.exports = router


// const authHeader = req.headers['token']
//     const token = authHeader
//     if (token == null) 
//         return res.sendStatus(401)
//     jwt.verify(token, process.env.jwt_secret, (err, user) => {
//         console.log(err)
//         if (err) return res.sendStatus(403)
//     })
    