const salesServices = require('../services/salesServices');


const getSalesControler = async (_req, res) => {
    const sales = await salesServices.getSalesServices();
    return res.status(200).json(sales);
};

const getSalesIdControler = async (req, res) => {
    try {
        const { id } = req.params;
        const salesId = await salesServices.getSalesByIdServices(id);
        return res.status(200).json(salesId);
    } catch (err) {
         return res.status(err.error).json({ message: err.message });
        }
};

const createSales = async (req, res) => {
    try {
        const data = req.body;
        const salesId = await salesServices.createSales(data);
        return res.status(201).json(salesId);
    } catch (err) {
         return res.status(err.error).json({ message: err.message });
        }
};

const updateSales = async (req, res) => {
        const data = req.body;
        const { id } = req.params;
        const updatesale = await salesServices.updateSales(data, id);
        return res.status(200).json(updatesale);
};

const deleteSales = async (req, res) => {
    try {
    const { id } = req.params;
    await salesServices.validDelete(id);
    return res.status(204).send();
    } catch (err) {
     return res.status(err.error).json({ message: err.message });
    }
};

module.exports = {
    getSalesControler,
    getSalesIdControler,
    createSales,
    updateSales,
    deleteSales,
};