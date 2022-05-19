const productsModels = require('../models/productModel');

const allProducts = async () => {
    const products = await productsModels.allProducts();

    return products;
};

const findProductsById = async (id) => {
    const products = await productsModels.findProductsById(id);
    if (products.length === 0) {
        return false;
    }

    return products[0];
};

const insertProduct = async (name, quantity) => {
  const sameName = await productsModels.sameNameProduct(name);
  if (sameName.length !== 0) {
    return false;
  }

  const insertedProduct = await productsModels.insertProduct(name, quantity);
  return insertedProduct;
};

const updateProductsById = async (id, name, quantity) => {
  const products = await productsModels.findProductsById(id);
  if (products.length === 0) {
      return false;
  }

  const updatedProduct = await productsModels.updateProductsById({ id, name, quantity });
  return updatedProduct;
};

module.exports = {
  allProducts,
  findProductsById,
  insertProduct,
  updateProductsById,
};