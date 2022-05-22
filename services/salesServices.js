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

  const updateSalesById = async (id, sold) => {
    const saleId = await salesModels.findSalesById(id);
    if (saleId.length === 0) {
        return false;
    }
  
    sold.filter((sales) => (salesModels.updateSalesById(id, sales.productId, sales.quantity)));
    
    return { saleId: id, itemUpdated: sold };
  };

  const deleteSalesById = async (id) => {
    const saleId = await salesModels.findSalesById(id);
    if (saleId.length === 0) {
        return false;
    }
  
    const deletedSale = await salesModels.deleteSalesById(id);
    return deletedSale;
  };

module.exports = {
    allSales,
    findSalesById,
    insertSales,
    updateSalesById,
    deleteSalesById,
};