const connection = require('./connection');

const allSales = async () => {
    const [sales] = await connection.execute(`SELECT sp.sale_id AS saleId, sa.date AS date,
    sp.product_id AS productId, sp.quantity AS quantity FROM StoreManager.sales_products
    AS sp JOIN StoreManager.sales AS sa ON sa.id = sp.sale_id`);

    return sales;
};

const findSalesById = async (id) => {
    const [sale] = await connection.execute(`SELECT sa.date AS date,
    sp.product_id AS productId, sp.quantity AS quantity FROM StoreManager.sales_products
    AS sp JOIN StoreManager.sales AS sa ON sa.id = sp.sale_id WHERE sp.sale_id = ?`, [id]);

    return sale;
};

const insertSales = async () => {
    const [sales] = await connection.execute(`INSERT INTO StoreManager.sales
    (date) VALUES (CURRENT_TIMESTAMP())`);  
  
    return sales;
  };

  const insertSaleProduct = async (saleId, productId, quantity) => {
    const [sales] = await connection.execute(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [saleId, productId, quantity]);
  
    return sales;
  };

  const updateSalesById = async (saleId, productId, quantity) => {
    const [sales] = await connection.execute(`UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ? WHERE sale_id = ?`, [productId, quantity, saleId]);

    const updatedSale = { productId, quantity, id: sales.saleId };

    return updatedSale;
  };

  const deleteSalesById = async (id) => {
    const [sales] = await connection.execute(
      'DELETE FROM StoreManager.sales WHERE id = ?', [id],
);
return sales;
  };
  
module.exports = {
    allSales,
    findSalesById,
    insertSales,
    insertSaleProduct,
    updateSalesById,
    deleteSalesById,
};