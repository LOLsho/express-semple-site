const validators = require('../lib/validators');

module.exports.post = (req, res) => {
    let userData = req.body;
    let email = validators.email(userData.email) ? userData.email : false;
    let password = validators.password(userData.password) ? userData.password : false;
    let mockUser = {email: 'banano-palma@inbox.ru', password: '123123'};

    if (email && password) {
        if (email === mockUser.email && password === mockUser.password) {
            req.session.isAdmin = true;
            res.redirect('/admin');
        } else {
            res.status(401).json({
              message: 'Wrong email or password'
            });
        }
    } else {
        res.status(400).json({
            message: "The incorrect data received"
        });
    }
};

module.exports.get = (req, res) => {
  res.render('pages/login');
};