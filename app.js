// app.js contruído na monitoria do Rafael Carvalho
const express = require('express');
require('dotenv').config();
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validateProducts = require('./middlewares/validateProducts');
const validateSales = require('./middlewares/validateSales');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.allProducts);
app.get('/products/:id', productsController.findProductsById);
app.post('/products', validateProducts, productsController.insertProduct);
app.put('/products/:id', validateProducts, productsController.updateProductsById);
app.delete('/products/:id', productsController.deleteProductsById);
app.get('/sales', salesController.allSales);
app.get('/sales/:id', salesController.findSalesById);
app.post('/sales', validateSales, salesController.insertSales);
app.put('/sales/:id', validateSales, salesController.updateSalesById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;