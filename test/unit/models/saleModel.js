const sinon = require('sinon');
const { expect } = require('chai');

const productsMock = require("../mocks/productsMock");
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

describe("models", () => {
  describe("saleModel", () => {
    describe("#allSales", () => {
      describe("Quando a tabela `sales` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(connection, "execute").resolves([productsMock.empty]);
        });

        afterEach(() => {
          connection.execute.restore();
        });

        it("retorna um array vazio", async () => {
          const sales = await saleModel.allSales();
          expect(sales).to.be.deep.equal(productsMock.empty);
        });
      });

      describe("Quando a tabela `sales` tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(connection, "execute").resolves([productsMock.full]);
        });

        afterEach(() => {
          connection.execute.restore();
        });

        it("o objeto que está no array possui os elementos esperados", async () => {
          const sales = await saleModel.allSales();
          expect(sales).to.be.deep.equal(productsMock.full);
        });
      });
    });
    describe("#insertSales", () => {
      beforeEach(() => {
        sinon.stub(connection, "execute").resolves([ productsMock.inserted ]);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it("retorna o objeto com os atributos id, name, quantity", async () => {
        const { id, name, quantity } = productsMock.inserted;
        const sales = await saleModel.insertSales( id, name, quantity );
        expect(sales).to.be.deep.equal(productsMock.inserted);
      });
  });

  describe("#findSalesById", () => {
    describe("Quando a tabela `product` não tiver dados !", () => {
      beforeEach(() => {
        sinon.stub(connection, "execute").resolves([productsMock.empty]);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it("retorna um array vazio", async () => {
        const products = await saleModel.findSalesById();
        expect(products).to.be.equal(productsMock.empty);
      });
    });

    describe("Quando a tabela `product` tiver dados !", () => {
      beforeEach(() => {
        sinon.stub(connection, "execute").resolves([productsMock.full]);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it("o objeto que está no array possui os elementos esperados", async () => {
        const products = await saleModel.findSalesById();
        expect(products).to.be.deep.equal(productsMock.full);
      });
    });
});
});
});