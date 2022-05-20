const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('Ao chamar o models allProducts', () => {
  describe('quando o payload é vazio', () => {
    const resolve = [[]]
    const resultPayload = [];

    beforeEach(() => {
        sinon.stub(connection, 'execute')
        .resolves(resolve);
      });

    afterEach(() => {
        connection.execute.restore();
    });

    it('tal objeto possui um "id" ', async () => {
        const response = await productModel.insertProduct();
      
        expect(response).to.have.a.property('id')
    });

    it('retorna um array', async () => {
       const result = await productModel.findProductsById(1);  
       expect(result).to.deep.equal(resultPayload);
    });

    it('o array não está vazio', async () => {
        const result = await productModel.allProducts();  
        expect(result).to.deep.equal(resultPayload);
    });

    it('o array possui objetos', async () => {
        const [result] = await productModel.allProducts();  
        expect(result).to.be.an('object');
    });

    it('o objeto que está no array possui os atributos id, name, quantity', async () => {
        const [result] = await productModel.allProducts();  
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        );
    });
  });
});
