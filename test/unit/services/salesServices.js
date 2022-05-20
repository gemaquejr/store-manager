const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const salesServices = require('../../../services/salesServices');

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
       const result = await salesServices.allSales();  
       expect(result[0]).to.be.an('array');
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

    it('é chamado o status com o código 200', async () => {
        const result = await salesServices.allSales(result);
  
        expect(result.status.calledWith(200)).to.be.equal(true);
      });

    it('é chamado o status com o código 201', async () => {
      const result = await salesServices.allSales();
      expect(result.status.calledWith(201)).to.be.equal(true);
    });
  });
});