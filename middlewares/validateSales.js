const validUndefinedSales = (req, _res, next) => {
    const data = req.body;
    data.forEach((e) => {
        if (e.productId === undefined) {
           return next({ statusCode: 400, 
               message: '"productId" is required' });
        }
        if (e.quantity === undefined) {
            return next({ statusCode: 400, message: '"quantity" is required' });
        }
    });
    next();
 };

 const validQuantityLengthSales = (req, res, next) => {
   const data = req.body;
   data.forEach((e) => {
       if (e.quantity <= 0) {
           return next({ statusCode: 422, 
               message: '"quantity" must be greater than or equal to 1' });
       }
   });
   next();
 };

 function isNum(val) {
   if (val > 0 || val < 0) return true;
   return false;
 }

module.exports = {
   validUndefinedSales,
   validQuantityLengthSales,
   // erro,
   isNum,
};