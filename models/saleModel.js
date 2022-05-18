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

module.exports = {
    allSales,
    findSalesById,
};