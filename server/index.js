const express = require('express');
const bodyParser = require('body-parser');
const matlab = require("node-matlab");
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/runMatlab', (req, res) => {
  console.log(req.body) ; // Extract form data from request body
  const {numberOfTrays,feedTrayPosition}=req.body;
  matlab
    .run(`
      clc;
      clear;
      result = ${numberOfTrays} + ${feedTrayPosition};
      disp(result);
    `)
    .then((result) => {
      console.log(result);
      res.status(200).send(result); // Send the result back to the client
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error); // Handle errors by sending an error response
    });
});


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
