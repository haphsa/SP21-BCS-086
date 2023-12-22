const express = require('express');
const router = express.Router();

router.post('/finals/calculator', async (req, res) => {
  try {
    // Extract data from the form submission
    const { operand1, operation, operand2 } = req.body;

    // Perform calculation based on the operation
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

    // Store data in session
    if (!req.session.calculations) {
      req.session.calculations = [];
    }

    req.session.calculations.push({
      operand1: parseFloat(operand1),
      operation,
      operand2: parseFloat(operand2),
      result,
    });

    // Redirect back to the form
    res.redirect('/');

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
