const sinon = require('sinon');
const { expect } = require('chai');

const productsMock = require("../mocks/productsMock");
const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');


describe("services", () => {
  describe("productsController", () => {
    describe("#allProducts", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        const req = {};
        const res = {};

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsServices, 'allProducts').resolves(productsMock.empty)
        });

        afterEach(() => {
          productsServices.allProducts.restore();
        });

        it("deve chamar a função `res.status` com o valor 200", async () => {
          await productsController.allProducts(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("deve chamar a função `res.json` com um array vazio", async () => {
          await productsController.allProducts(req, res);
          expect(res.json.calledWith(productsMock.empty)).to.be.true;
        });
      });

      describe("Quando a tabela `product` tiver dados !", () => {
        const req = {};
        const res = {};

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsServices, 'allProducts').resolves(productsMock.full)
        });

        afterEach(() => {
          productsServices.allProducts.restore();
        });

        it("deve chamar `res.status` com o valor 200", async () => {
          await productsController.allProducts(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("deve chamar a função `res.json` com os elementos esperados", async () => {
          await productsController.allProducts(req, res);
          expect(res.json.calledWith(productsMock.full)).to.be.true;
        });
      });
      });
      
      describe("#insertProduct", () => {
        const req = {};
        const res = {};
        
        beforeEach(() => {
          const { name, quantity } = productsMock
          req.body = { name, quantity };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsServices, 'insertProduct').resolves(productsMock)
        });

        afterEach(() => {
          productsServices.insertProduct.restore();
        });

        it('deve chamar `res.status` com o valor de 201', async () => {
          await productsController.insertProduct(req, res);
          expect(res.status.calledWith(201)).to.be.true;
        });

        it('deve chamar `res.jason` com o objeto cadastrado', async () => {
          await productsController.insertProduct(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      })

      describe("#findProductsById", () => {
        const req = {};
        const res = {};
        
        beforeEach(() => {
          const { id } = productsMock
          req.params = { id };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsServices, 'findProductsById').resolves(productsMock)
        });

        afterEach(() => {
          productsServices.findProductsById.restore();
        });

        it('deve chamar `res.status` com o valor de 200', async () => {
          await productsController.findProductsById(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar `res.jason` com o objeto cadastrado', async () => {
          await productsController.findProductsById(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      })

      describe("#updateProductsById", () => {
        const req = {};
        const res = {};
        
        beforeEach(() => {
          const { id } = productsMock
          const { name, quantity } = productsMock
          req.params = { id };
          req.body = { name, quantity };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsServices, 'updateProductsById').resolves(productsMock)
        });

        afterEach(() => {
          productsServices.updateProductsById.restore();
        });

        it('deve chamar `res.status` com o valor de 200', async () => {
          await productsController.updateProductsById(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar `res.jason` com o objeto cadastrado', async () => {
          await productsController.updateProductsById(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      })
    });
  });