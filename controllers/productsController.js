const productsServices = require('../services/productsServices');

const allProducts = async (_req, res) => {
    const products = await productsServices.allProducts();

    return res.status(200).json(products);
};

const findProductsById = async (req, res) => {
    const { id } = req.params;
    const products = await productsServices.findProductsById(id);

    if (!products) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(products);
};

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsServices.insertProduct(name, quantity);

  if (!products) {
      return res.status(409).json({ message: 'Product already exists' });
  }

  return res.status(201).json(products);
};

const updateProductsById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const products = await productsServices.updateProductsById(id, name, quantity);

  if (!products) {
      return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(products);
};

module.exports = {
  allProducts,
  findProductsById,
  insertProduct,
  updateProductsById,
};