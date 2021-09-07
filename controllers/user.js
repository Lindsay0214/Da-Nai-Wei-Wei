const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const { User } = db

const userController = {

  register: (req, res) => {
    console.log('———————————————————— Register 。。。————————————————————'); 
    const { nickname, password, email } = req.body;
    console.log('email:',email);
    console.log('nickname:',nickname);
    console.log('password:',password);

    if (!email || !nickname || !password)
      return res.status(400).json({ok: 0, message:"上面欄位，填好，填滿"});
        User.findOne({
          where: {
            email
          }
        })
          .then(user => {
            if (user) return res.status(500).json("這個帳號有人用了，換一個吧～");
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) return res.status(500).json({ok: 0,message: err});
              User.create({
                email,
                nickname,
                password: hash
              }).then(() => {
                const email = req.session.email
                console.log('———————————————————— Register OK！————————————————————')
                res.status(200).json({ok: 1, email});
              }).catch(err => {
                console.log('唉唷！遇到了一些狀況呢...', err);
                return res.status(500).json({ok: 0,message: err});
              });
            });
          })
          .catch(err => {
            console.log('唉唷！遇到了一些狀況呢...', err);
            return res.status(500).json({ok: 0,message: err});
          });
      },

  login: (req, res) => {
    console.log('———————————————————— Login。。。————————————————————')
    const { email, password } = req.body;
    console.log('email:',email)
    console.log('password:',password)
    if (!email || !password)
      return res.status(400).json("再檢查一下，有地方填錯囉！");
      User.findOne({
        where: {
          email
        }
      })
        .then(user => {
          if (!user) return res.status(400).json("再檢查一下，有地方填錯囉！");
          bcrypt.compare(password, user.password, (err, isSuccess) => {
            if (err || !isSuccess) return res.status(400).json("再檢查一下，有地方填錯囉！");
            const email = req.session.email
            console.log('———————————————————— Login OK！————————————————————')
            res.status(200).json({ok: 1, email});
          });
        })
        .catch(err => {
          console.log('發生錯誤，回傳 err：', err);
          return res.status(500).json({ok: 0,message: err});
        });
    },

  logout: (req, res) => {
    res.status(200).json({ok: 1, message: "成功登出囉～"});
  }

}

module.exports = userController