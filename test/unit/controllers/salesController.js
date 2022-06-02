const sinon = require("sinon");
const { expect } = require("chai");

const productsMock = require("../mocks/productsMock");
const salesServices = require("../../../services/salesServices");
const salesController = require("../../../controllers/salesController");

describe("controllers", () => {
  describe("salesController", () => {
    describe("#allSales", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        const req = {};
        const res = {};

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(salesServices, "allSales").resolves(productsMock.empty);
        });

        afterEach(() => {
          salesServices.allSales.restore();
        });

        it("deve chamar a função `res.status` com o valor 200", async () => {
          await salesController.allSales(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("deve chamar a função `res.json` com um array vazio", async () => {
          await salesController.allSales(req, res);
          expect(res.json.calledWith(productsMock.empty)).to.be.true;
        });
      });

      describe("Quando a tabela `product` tiver dados !", () => {
        const req = {};
        const res = {};

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(salesServices, "allSales").resolves(productsMock.full);
        });

        afterEach(() => {
          salesServices.allSales.restore();
        });

        it("deve chamar `res.status` com o valor 200", async () => {
          await salesController.allSales(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("deve chamar a função `res.json` com os elementos esperados", async () => {
          await salesController.allSales(req, res);
          expect(res.json.calledWith(productsMock.full)).to.be.true;
        });
      });

      describe("#insertSales", () => {
        const req = {};
        const res = {};

        beforeEach(() => {
          const { name, quantity } = productsMock;
          req.body = { name, quantity };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(salesServices, "insertSales").resolves(productsMock);
        });

        afterEach(() => {
          salesServices.insertSales.restore();
        });

        it("deve chamar `res.status` com o valor de 201", async () => {
          await salesController.insertSales(req, res);
          expect(res.status.calledWith(201)).to.be.true;
        });

        it("deve chamar `res.jason` com o objeto cadastrado", async () => {
          await salesController.insertSales(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      });

      describe("#findSalesById", () => {
        const req = {};
        const res = {};
        
        beforeEach(() => {
          const { id } = productsMock
          req.params = { id };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(salesServices, "findSalesById").resolves(productsMock);
        });

        afterEach(() => {
          salesServices.findSalesById.restore();
        });

        it('deve chamar `res.status` com o valor de 200', async () => {
          await salesController.findSalesById(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar `res.jason` com o objeto cadastrado', async () => {
          await salesController.findSalesById(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      })

      describe("#updateSalesById", () => {
        const req = {};
        const res = {};
        
        beforeEach(() => {
          const { id } = productsMock
          const { name, quantity } = productsMock
          req.params = { id };
          req.body = { name, quantity };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(salesServices, 'updateSalesById').resolves(productsMock)
        });

        afterEach(() => {
          salesServices.updateSalesById.restore();
        });

        it('deve chamar `res.status` com o valor de 200', async () => {
          await salesController.updateSalesById(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar `res.jason` com o objeto cadastrado', async () => {
          await salesController.updateSalesById(req, res);
          expect(res.json.calledWith(productsMock)).to.be.true;
        });
      })
    });
  });
});
