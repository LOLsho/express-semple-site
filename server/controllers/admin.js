const data = require('../lib/data');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');



module.exports.get = (req, res) => {
  res.render('pages/admin');
};

module.exports.upload = (req, res) => {

  const form = new formidable.IncomingForm();


  form.parse(req, (err, fields, files) => {
    let name = typeof fields.name === 'string' && fields.name.trim().length > 0 ? fields.name.trim() : false;
    let price = typeof fields.price === 'string' && fields.price.trim().length > 0 && + +fields.price >= 0
      ? fields.price.trim() : false;

    if (name && price) {
      let dataToSave = {
        name,
        price,
        image: files.photo.name
      };
      data.create('products', name, dataToSave, (error) => {
        if (!error) {
          data.update('products', name, dataToSave, (error) => {
            if (!error) {
              let oldPath = files.photo.path;
              let newPath = path.join(process.cwd(), '../public/assets/img/products/') + files.photo.name;

              fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                res.status(200).redirect('/');
              });
            } else {
              console.log(error);
            }
          })
        } else {
          console.log(error);
        }
      });
    } else {
      console.log('Incorrect data received!');
    }
  });
};

module.exports.skills = (req, res) => {
  let skills = req.body;
  let age = +skills.age >= 1 ? skills.age : false;
  let concerts = +skills.concerts >= 1 ? skills.concerts : false;
  let cities = +skills.cities >= 1 ? skills.cities : false;
  let years = +skills.years >= 1 ? skills.years : false;

  if (age && concerts && cities && years) {
    let dataToSave = { age, concerts, cities, years };
    data.update('skills', 'skills', dataToSave, (error) => {
      if (!error) {
        res.redirect('/');
      } else {
        console.log('error - ', error);
        res.status(500).json({
          message: "Error updating the skills file"
        });
      }
    });
  } else {
    res.status(400).json({
      message: "The incorrect data received. Lowest number of skill is 1"
    });
  }
};
