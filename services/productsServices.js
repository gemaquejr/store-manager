const productsModels = require('../models/productModel');

const objErrorNotFound = {
  error: 404,
  message: 'Product not found',
};
const objErrorExists = {
  error: 409,
  message: 'Product already exists',
};
const getProductsServices = async () => {
  const products = await productsModels.getProducts();
  return products;
};

const getProductsByIdServices = async (id) => {
  const productsID = await productsModels.getProductsById(id);
  if (productsID.length < 1) throw objErrorNotFound;
  return productsID;
};

const validCreate = async (name, quantity) => {
  const products = await productsModels.getProducts();
  const validproduct = products.some((e) => e.name === name);
  if (!validproduct) {
     const newproduct = await productsModels.createProducts(name, quantity);
     return newproduct;
  }
  throw objErrorExists;
};

const validUpdate = async (id, name, quantity) => {
  const products = await productsModels.getProductsById(id);
  if (products.length > 0) {
      await productsModels.updateProducts(id, name, quantity);
      const [productsnew] = await productsModels.getProductsById(id);
      return productsnew;
  }
  throw objErrorNotFound;
};

const validDelete = async (id) => {
  const products = await productsModels.getProductsById(id);
  if (products.length > 0) {
      await productsModels.deleteProducts(id);
      return true;
  }
  throw objErrorNotFound;
};

const updateQuantiProducts = async (data) => {
  await data.forEach(async (e) => {
      await productsModels.updateProductsQuantityCreate(e.productId, e.quantity);
  });
};

const updateQuantiProductsDelete = async (data) => {
  await data.forEach(async (e) => {
      await productsModels.updateProductsQuantityDelete(e.productId, e.quantity);
  });
};

module.exports = {
  getProductsServices,
  getProductsByIdServices,
  validCreate,
  validUpdate,
  validDelete,
  updateQuantiProducts,
  updateQuantiProductsDelete,
};