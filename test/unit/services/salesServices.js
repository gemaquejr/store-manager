const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const salesServices = require('../../../services/salesServices');

describe('Ao chamar o models allProducts', () => {
  describe('quando o payload informado não é válido', async () => {
    const resultPayload = [[]]

    beforeEach(() => {
        sinon.stub(saleModel, 'execute')
        .resolves(resultPayload);
      });

    afterEach(() => {
        saleModel.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesServices.findSalesById(1);  
      expect(result).to.deep.equal(resultPayload);
   });

    it('o array não está vazio', async () => {
        const result = await salesServices.allSales();  
        expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
        const [result] = await salesServices.allSales();  
        expect(result).to.be.an('object');
    });

    it('o objeto que está no array possui os atributos id, name, quantity', async () => {
        const [result] = await salesServices.allSales();  
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        );
    });
  });
});