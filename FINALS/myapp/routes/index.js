const express = require('express');
const router = express.Router();

const Service = require('../models/Service');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Express' });
});



const Gallery = require('../models/Gallery');

router.get('/imagegallery', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;

    const totalItems = await Gallery.countDocuments({});
    const pageCount = Math.ceil(totalItems / pageSize);

    const galleries = await Gallery.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.render('imagegallery', {
      galleries,
      currentPage: page,
      pageCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    console.log(services);
    res.render('services', { title: 'Services', services });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/services", async function (req, res, next) {
  let service= new Service(req.body);
  await service.save();
  res.redirect("/services");
});
router.get("/services/delete/:id", async function (req, res, next) {
  let service = await Service.findByIdAndDelete(req.params.id);
  res.redirect("/services");
});
router.get('/login', (req, res, next) => {
  res.render('login', { page: 'login' });
});
router.get('/products', (req, res, next) => {
  res.render('products', { page: 'product' });
});
router.get('/layout', (req, res, next) => {
  res.render('layout', { page: 'layout' });
});
router.get('/finals', (req, res, next) => {
  res.render('finals', { page: 'finals' });
});
router.post("/calculator", async function (req, res, next) {
  try {
    const { operand1, operation, operand2 } = req.body;

    let result;
    switch (operation) {
      case '+':
        result = parseFloat(operand1) + parseFloat(operand2);
        console.log(result);
        break;
      case '-':
        result = parseFloat(operand1) - parseFloat(operand2);
        console.log(result);
        break;
      case '*':
        result = parseFloat(operand1) * parseFloat(operand2);
        console.log(result);
        break;
      case '/':
        result = parseFloat(operand1) / parseFloat(operand2);
        console.log(result);
        break;
      default:
        result = 'Invalid operation';
    }

    
    if (!req.session.calculations) {
      req.session.calculations = [];
    }

    req.session.calculations.push({
      operand1: parseFloat(operand1),
      operation,
      operand2: parseFloat(operand2),
      result,
    });


    calcArray.push({
      operand1: parseFloat(operand1),
      operation,
      operand2: parseFloat(operand2),
      result,
    });

    // Log calculationsArray to the console
    console.log('Calculations Array:', calcArray);
  
    res.redirect('/finals');

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
const calcArray = [];

router.get('/calculations', (req, res) => {
  // Render the HTML page and pass the calculations array
  res.render('calculations', { calculations: req.session.results || [] });
});


module.exports = router;
