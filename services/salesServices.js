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

module.exports = {
    allSales,
    findSalesById,
};