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

module.exports = {
    allProducts,
    findProductsById,
};