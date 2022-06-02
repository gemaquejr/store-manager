const connection = require('./connection');

const allProducts = async () => {
    const [product] = await connection.execute('SELECT * FROM products');

    return product;
};

const findProductsById = async (id) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    console.log(product);

    return product;
};

const sameNameProduct = async (name) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);

  return product;
};

const insertProduct = async (name, quantity) => {
  const [product] = await connection.execute(`INSERT INTO StoreManager.products
  (name, quantity) VALUES (?, ?)`, [name, quantity]);

  const newProduct = { id: product.insertId, name, quantity };

  return newProduct;
};

const updateProductsById = async ({ id, name, quantity }) => {
  const [product] = await connection.execute(`UPDATE StoreManager.products
  SET name = ?, quantity = ? WHERE id = ?`, [id, name, quantity]);

  const updatedProduct = { id: product.insertId, name, quantity };

  return updatedProduct;
};

const deleteProductsById = async (id) => {
  const [product] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);

  return product;
};

module.exports = {
  allProducts,
  findProductsById,
  insertProduct,
  sameNameProduct,
  updateProductsById,
  deleteProductsById,
  
};