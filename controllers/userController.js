const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const { User } = db

const userController = {

register: async (req, res) => {
    console.log('———————————————————— Register 。。。————————————————————');
    const role = 'consumer'
    let user;
    const { nickname, password, email } = req.body;
    console.log('email:',email);
    console.log('nickname:',nickname);
    console.log('password:',password);
    if (!email || !nickname || !password)
        return res.json({ok: 0, message:"上面欄位，填好，填滿"});
    try {
        await User.findOne({where: {email}});
        // 這行不知道可以放哪裡作用
        // if (user) return res.json({ok: 0, message:"這個帳號有人用了，換一個吧～"});
        await User.create({email, nickname, password});
        // hash 似乎要另外做
        console.log('———————————————————— Register OK！————————————————————')
        res.status(200).json({ok: 1, email});
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
    if (!email || !password)
      return res.json({ok: 0, message:"都要填喔，再檢查一下！"});
    try {
        await User.findOne({where: {email}});
        // 這行不知道可以放哪裡作用
        // if (!user) return res.json("再檢查一下，有地方填錯囉！");

        //   bcrypt.compare(password, user.password, (err, isSuccess) => {
        //     if (err || !isSuccess) return res.status(400).json("再檢查一下，有地方填錯囉！");
        
        // 這邊不會處理，所以現在隨便都可以登入
        // const email = req.session.email
            console.log('———————————————————— Login OK！————————————————————')
            res.json({ok: 1, email});
        //   });
        } catch(err) {
          console.log('發生錯誤，回傳 err：', err);
          return res.json({ok: 0,message: err});
        }
    },

  logout: (req, res) => {
    // 但現在也沒有 session 可消滅？
    // req.session.destroy();
    res.json({ok: 1, message: "成功登出囉～"});
  }

}

module.exports = userController