const salesModels = require('../models/saleModel');

const allSales = async () => {
    const sales = await salesModels.allSales();

    return sales;
};

const findSalesById = async (id) => {
    const sale = await salesModels.findSalesById(id);
    if (sale.length === 0) {
        return false;
    }

    return sale;
};

const insertSales = async (sold) => {
    const saleId = await salesModels.insertSales();  
    sold.filter(({ productId, quantity }) => (salesModels.allSales(saleId, productId, quantity)));

    return { id: saleId, itemsSold: sold };
  };

module.exports = {
    allSales,
    findSalesById,
    insertSales,
};