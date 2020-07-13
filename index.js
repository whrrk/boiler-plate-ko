const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/Users');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
//1
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); //이게 있어야 클라이언트의 정보를 받아줘서 req.body를 사용할 수 있음.

app.use(cookieParser());

mongoose.connect(config.mongoURI
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
).then(() => { console.log("mongoDB connected") })
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~안녕'));


//회원가입을 이용한 라우트
app.post('/api/users/register', (req, res) => {

    const user = new User(req.body);

    //몽고디비에서 사용할 수 있는거 mongodb에 user가 저장돰
    user.save((err, userInfo) => {
        if (err) return res, json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });


});

app.post('/api/users/login', (req, res) => {

    //email search -> email and 비밀번호가 맞는지.
    //그 후 토큰 생성
    User.findOne({ email: req.body.email }, (err, user) => {

        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {

            if (!isMatch) {

                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            user.generateToken((err, user) => {

                if (err) return res.status(400).send(err);

                //토큰을 제대로 생성했으면 토큰을 저장해야함.

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

//로그인 되어있는지, 권한을 어떻게 가지고 있는지
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => console.log('Example app listening on port' + port + '!'));
