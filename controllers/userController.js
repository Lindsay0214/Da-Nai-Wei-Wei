const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const { User } = db

const userController = {

  register: async (req, res) => {
      console.log('———————————————————— Register 。。。————————————————————');
      const role = 'consumer'
      const { nickname, password, email } = req.body;
      console.log('email:',email);
      console.log('nickname:',nickname);
      console.log('password:',password);
      // 空值檢查
      if (!email || !nickname || !password)
          return res.json({ok: 0, message:"上面欄位，填好，填滿"});
      try {
          const user = await User.findOne({where: {email}});
          // 重複帳號檢查
          if (user) return res.json({ok: 0, message:"這個帳號有人用了，換一個吧～"});
          // hash
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) return res.json({ok: 0,message: err});
            await User.create({email, nickname, password: hash});
            console.log('———————————————————— Register OK！————————————————————')
            res.status(200).json({ok: 1, email});
          });
      } catch (err) {
          console.log('唉唷！遇到了一些狀況呢...', err);
          res.json({ok: 0, message:"失敗"});
      }
  },

  login: async (req, res) => {
    console.log('———————————————————— Login。。。————————————————————')
    const { email, password } = req.body;
    console.log('email:',email)
    console.log('password:',password)
    // 空值檢查
    if (!email || !password)
      return res.json({ok: 0, message:"都要填喔，再檢查一下！"});
    try {
        const user = await User.findOne({where: {email}});
        // 帳號檢查
        if (!user) return res.json({ok: 0, message: "再檢查一下，有地方填錯囉！"});
         // hash
          bcrypt.compare(password, user.password, async (err, isSuccess) => {
            if (err || !isSuccess) return res.json({ok: 0, message: "再檢查一下，有地方填錯囉！"});
            console.log('———————————————————— Login OK！————————————————————')
            res.json({ok: 1, email});
          });
        } catch(err) {
          console.log('唉唷！遇到了一些狀況呢...', err);
          return res.json({ok: 0,message: err});
        }
        // session
        req.session.email = user.email
    },

  logout: (req, res) => {
    // req.session.cookie.maxAge = 0; 設置 cookie 時間為 0
    req.session.destroy();
    res.json({ok: 1, message: "成功登出囉～"});
  }

}

module.exports = userController