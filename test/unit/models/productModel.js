const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

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
        sinon.stub(connection, 'execute')
        .resolves([resultPayload]);
      });

    afterEach(() => {
        connection.execute.restore();
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
        const result = await productModel.allProducts(request, response);

      expect(result.send.calledWith('Dados inválidos')).to.be.equal(true);
    });

    it('retorna um array', async () => {
       const result = await productModel.allProducts();  
       expect(result[0]).to.be.an('array');
    });

    it('o array não está vazio', async () => {
        const result = await productModel.allProducts();  
        expect(result).to.be.not.empty;
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

    it('é chamado o status com o código 200', async () => {
        const result = await productModel.allProducts(result);
  
        expect(result.status.calledWith(200)).to.be.equal(true);
      });

    it('é chamado o status com o código 201', async () => {
      const result = await productModel.allProducts();
      expect(result.status.calledWith(201)).to.be.equal(true);
    });
  });
});