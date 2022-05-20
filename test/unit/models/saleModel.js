const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

describe('Ao chamar o models allProducts', () => {
  describe('quando o payload informado não é válido', async () => {
    const resolves = [[]]
    const resultPayload = []

    beforeEach(() => {
        sinon.stub(connection, 'execute')
        .resolves(resolves);
      });

    afterEach(() => {
        connection.execute.restore();
    });

    it('tal objeto possui um "id" ', async () => {
      const response = await saleModel.insertSales();
    
      expect(response).to.have.a.property('id')
  });

    it('retorna um array', async () => {
      const result = await saleModel.findSalesById(1);  
      expect(result).to.deep.equal(resultPayload);
   });

   it('o array não está vazio', async () => {
    const result = await saleModel.allSales();  
    expect(result).to.deep.equal(resultPayload);
});

    it('o array possui objetos', async () => {
        const [result] = await saleModel.allSales();  
        expect(result).to.be.an('object');
    });

    it('o objeto que está no array possui os atributos id, name, quantity', async () => {
        const [result] = await saleModel.allSales();  
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        );
    });
  });
});