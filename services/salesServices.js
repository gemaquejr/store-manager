const salesModels = require('../models/saleModel');
const productModel = require('../models/productModel');

const productsServices = require('./productsServices');

const objError = {
    error: 404,
    message: 'Sale not found',
};
const objErrorSales = {
    error: 422,
    message: 'Such amount is not permitted to sell',
};
const getSalesServices = async () => {
    const sales = await salesModels.getSales();
    return sales;
};

const getSalesByIdServices = async (id) => {
    const salesID = await salesModels.getSalesById(id);
    if (salesID.length < 1) throw objError;
    return salesID;
};

const verificProducts = async (data) => {
    const verifcproduct = await Promise.all((data.map(async (e) => {
        const [teste] = await productModel.getProductsById(e.productId);
        if (teste.quantity - e.quantity >= 0) return true;
        throw objErrorSales;
    })));
    return verifcproduct;
};

const createSales = async (data) => {
    await verificProducts(data);
    const datanow = '2022-05-10 22:20:10'; // mokei uma data qualquer
    const sales = await salesModels.createSales(datanow);
    await data.forEach(async (e) => {
        salesModels.createSalesProducers(sales.id, e.productId, e.quantity);
    });
    await productsServices.updateQuantiProducts(data);
    const getsales = await salesModels.getSalesAndProducts(sales.id);
    if (getsales.length < 1) throw objError;
    const ojb = {
        id: sales.id,
        itemsSold: getsales,
    };
    return ojb;
};

const updateSales = async (data, id) => {
    const salesID = await salesModels.getSalesById(id);
    await data.forEach(async (e) => {
        await salesModels.updateSales(id, e.productId, e.quantity);
        await productsServices.updateQuantiProductsDelete(salesID);
    });
    const obj = {
        saleId: id,
        itemUpdated: data,
    };
    return obj;
};

const validDelete = async (id) => {
    const salesID = await salesModels.getSalesById(id);
    if (salesID.length > 0) {
        await salesModels.deleteSales(id);
        await productsServices.updateQuantiProductsDelete(salesID);
        return true;
    }
    throw objError;
};

module.exports = {
    getSalesServices,
    getSalesByIdServices,
    createSales,
    updateSales,
    validDelete,
    verificProducts,
};