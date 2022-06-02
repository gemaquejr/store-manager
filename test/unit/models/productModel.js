const sinon = require("sinon");
const { expect } = require("chai");

const productsMock = require("../mocks/productsMock");
const productModel = require("../../../models/productModel");
const connection = require("../../../models/connection");

describe("models", () => {
  describe("productModel", () => {
    describe("#allProducts", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(connection, "execute").resolves([productsMock.empty]);
        });

        afterEach(() => {
          connection.execute.restore();
        });

        it("retorna um array vazio", async () => {
          const products = await productModel.allProducts();
          expect(products).to.be.deep.equal(productsMock.empty);
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
          const products = await productModel.allProducts();
          expect(products).to.be.deep.equal(productsMock.full);
        });
      });
    });
    
    describe("#insertProduct", () => {
      beforeEach(() => {
        sinon.stub(connection, "execute").resolves([{ insertId: productsMock.inserted.id }]);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it("retorna o objeto com os atributos id, name, quantity", async () => {
        const { name, quantity } = productsMock.inserted
        const products = await productModel.insertProduct(name, quantity);
        expect(products).to.be.deep.equal(productsMock.inserted);
      });
    })

    describe("#findProductsById", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(connection, "execute").resolves([productsMock.empty]);
        });

        afterEach(() => {
          connection.execute.restore();
        });

        it("retorna um array vazio", async () => {
          const products = await productModel.findProductsById();
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
          const products = await productModel.findProductsById();
          expect(products).to.be.deep.equal(productsMock.full);
        });
      });
  });
});
});
