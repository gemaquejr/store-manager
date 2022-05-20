const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const productsServices = require('../../../services/productsServices');

describe('Ao chamar o models allProducts', () => {
  describe('quando o payload informado não é válido', async () => {
    const resultPayload = []

    beforeEach(() => {
        sinon.stub(saleModel, 'execute')
        .resolves([resultPayload]);
      });

    afterEach(() => {
        saleModel.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsServices.findSalesById(1);  
      expect(result).to.deep.equal(resultPayload);
   });

   it('o array não está vazio', async () => {
    const result = await productsServices.allProducts();  
    expect(result).to.deep.equal(resultPayload);
});

    it('o array possui objetos', async () => {
        const [result] = await productsServices.allSales();  
        expect(result).to.be.an('object');
    });

    it('o objeto que está no array possui os atributos id, name, quantity', async () => {
        const [result] = await productsServices.allSales();  
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        );
    });
  });
});