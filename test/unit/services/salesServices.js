const sinon = require('sinon');
const { expect } = require('chai');

const productsMock = require("../mocks/productsMock");
const saleModel = require('../../../models/saleModel');
const salesServices = require('../../../services/salesServices');
// const productModel = require('../../../models/productModel');

describe("services", () => {
  describe("salesServices", () => {
    describe("#allSales", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(saleModel, 'allSales').resolves(productsMock.empty);
        });

        afterEach(() => {
          saleModel.allSales.restore();
        });

        it("retorna um array vazio", async () => {
          const products = await salesServices.allSales();
          expect(products).to.be.deep.equal(productsMock.empty);
        });
      });
    });
    
    describe("Quando a tabela `product` tiver dados !", () => {
      beforeEach(() => {
        sinon.stub(saleModel, "allSales").resolves(productsMock.full);
      });

      afterEach(() => {
        saleModel.allSales.restore();
      });

      it('retorna um array', () => async () => {
        const response = await salesServices.allSales( );
        expect(response).to.be.an('array');
      })

      it("o objeto que está no array possui os elementos esperados", async () => {
        const products = await salesServices.allSales();
        expect(products).to.be.deep.equal(productsMock.full);
      });
    });

    describe("#findSalesById", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(saleModel, 'findSalesById').resolves([productsMock.empty]);
        });

        afterEach(() => {
          saleModel.findSalesById.restore();
        });

        it("retorna um array vazio", async () => {
          const products = await salesServices.findSalesById();
          expect(products).to.be.deep.equal([productsMock.empty]);
        });
      });
        
    describe("Quando a tabela `product` tiver dados !", () => {
      beforeEach(() => {
        sinon.stub(saleModel, "findSalesById").resolves(productsMock.full);
      });

      afterEach(() => {
        saleModel.findSalesById.restore();
      });

      it("o objeto que está no array possui os elementos esperados", async () => {
        const products = await salesServices.findSalesById();
        expect(products).to.be.deep.equal(productsMock.full);
      });
    });

  describe('inserindo vendas', () => { 
    const id = 1;  
    before(async () => {
      sinon.stub(saleModel, 'insertSales').resolves(id);
    })
  
    after(async () => {
      saleModel.insertSales.restore();
    });
  
    it('retorna um objeto', async () => {
      const response = await salesServices.insertSales(productsMock.sale);
  
      expect(response).to.be.an('object');
    })
  })
})
})
})