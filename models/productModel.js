const connection = require('./connection');

const allProducts = async () => {
    const [product] = await connection.execute('SELECT * FROM products');

    return product;
};

const findProductsById = async (id) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

    return product;
};

module.exports = {
    allProducts,
    findProductsById,
};