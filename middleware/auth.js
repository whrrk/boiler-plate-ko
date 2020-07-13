const { User } = requre('./models/Users');

let auth = (req, res, next) => {
    //인증처리
    //1.클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;
    //2.토큰 복호화
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
    //3.유저가 있으면 okay

    //4. 유저가 없으면 no!

};

module.exports = { auth };