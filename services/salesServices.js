const salesModels = require('../models/saleModel');
const productModel = require('../models/productModel');

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

const removeQuantity = (sold) => { 
    sold.filter(({ productId, quantity }) => (productModel.removeQuantity(quantity, productId))); 
};

const addQuantity = (sold) => { 
    sold.filter(({ productId, quantity }) => (productModel.addQuantity(quantity, productId)));
  };

  // Ajuda na monitoria de Thiago Paz com debug

const insertSales = async (sold) => {
    const saleId = await salesModels.insertSales();
    console.log(saleId);  
    sold.filter(({ productId, quantity }) => (salesModels
        .insertSaleProduct(saleId.insertId, productId, quantity)));

    removeQuantity(sold);

    return { id: saleId.insertId, itemsSold: sold };
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
      console.log(id);
    const saleId = await salesModels.findSalesById(id);
    console.log(saleId);
    if (saleId.length === 0) {
        return false;
    }

    addQuantity(saleId);
    
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