const salesServices = require('../services/salesServices');

const allSales = async (_req, res) => {
    const sales = await salesServices.allSales();

    return res.status(200).json(sales);
};

const findSalesById = async (req, res) => {
    const { id } = req.params;
    const sales = await salesServices.findSalesById(id);

    if (!sales) {
        return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(200).json(sales);
};

const insertSales = async (req, res) => {
    const sales = req.body;
    const newSale = await salesServices.insertSales(sales);
  
    return res.status(201).json(newSale);
  };

module.exports = {
    allSales,
    findSalesById,
    insertSales,
};