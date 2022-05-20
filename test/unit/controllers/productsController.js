const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');


describe('Ao chamar o models allProducts', () => {
  describe('quando o payload informado não é válido', async () => {
    const resultPayload = [
        {
            id: 100,
            name: Pedrão,
            quantity: 1
        }
    ]

    beforeEach(() => {
        sinon.stub(productsServices, 'execute')
        .resolves([resultPayload]);
      });

    afterEach(() => {
        productsServices.execute.restore();
    });

    it('retorna um array', async () => {
       const result = await productsController.allSales();  
       expect(result[0]).to.be.an('array');
    });

    it('o array não está vazio', async () => {
        const result = await productsController.allSales();  
        expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
        const [result] = await productsController.allSales();  
        expect(result).to.be.an('object');
    });

    it('o objeto que está no array possui os atributos id, name, quantity', async () => {
        const [result] = await productsController.allSales();  
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        );
    });
  });
});