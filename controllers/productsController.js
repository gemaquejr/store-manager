const productsServices = require('../services/productsServices');

const getProductsControler = async (_req, res) => {
  const products = await productsServices.getProductsServices();
  res.status(200).json(products);
};

const getProductsIdControler = async (req, res) => {
  try {
      const { id } = req.params;
      const [productsId] = await productsServices.getProductsByIdServices(id);
      return res.status(200).json(productsId);  
  } catch (err) {
      return res.status(err.error).json({ message: err.message });
  }
};

const registerProduct = async (req, res) => {
  try {
  const { name, quantity } = req.body;
  const register = await productsServices.validCreate(name, quantity);
  const ojbProduct = {
      id: register.id,
      name, 
      quantity,
  };
 return res.status(201).json(ojbProduct);
 } catch (err) {
  return res.status(err.error).json({ message: err.message });
 }
};

const updateProduct = async (req, res) => {
  try {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const uptade = await productsServices.validUpdate(id, name, quantity);
  return res.status(200).json(uptade);
  } catch (err) {
      return res.status(err.error).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
  const { id } = req.params;
  await productsServices.validDelete(id);
  return res.status(204).send();
  } catch (err) {
   return res.status(err.error).json({ message: err.message });
  }
};

module.exports = {
  getProductsControler,
  getProductsIdControler,
  registerProduct,
  updateProduct,
  deleteProduct,
};
