const validateSales = (req, res) => {
    req.body.forEach((sale) => {
        const { productId, quantity } = sale;

        if (!productId) {
            return res.status(400).json({ message: '"productId" is required' });
        }

        if (!quantity) {
            return res.status(400).json({ message: '"quantity" is required' });
        }

        if (!Number.isInteger(quantity)) {
            return res.status(422).json({ message: '"quantity" must be integer' });
        }

        if (!quantity < 1) {
            return res.status(422)
            .json({ message: '"quantity" must be greater than or equal to 1' });
        }
    });
};

module.exports = validateSales;