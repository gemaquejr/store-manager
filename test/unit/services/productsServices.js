const sinon = require("sinon");
const { expect } = require("chai");

const productsMock = require("../mocks/productsMock");
const productModel = require("../../../models/productModel");
const productsServices = require("../../../services/productsServices");

describe("services", () => {
  describe("productsServices", () => {
    describe("#allProducts", () => {
      describe("Quando a tabela `product` não tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(productModel, "allProducts").resolves(productsMock.empty);
        });

        afterEach(() => {
          productModel.allProducts.restore();
        });

        it("retorna um array vazio", async () => {
          const products = await productsServices.allProducts();
          expect(products).to.be.deep.equal(productsMock.empty);
        });
      });

      describe("Quando a tabela `product` tiver dados !", () => {
        beforeEach(() => {
          sinon.stub(productModel, "allProducts").resolves(productsMock.full);
        });

        afterEach(() => {
          productModel.allProducts.restore();
        });
        
        it('retorna um array', () => async () => {
          const response = await productsServices.allProducts( );
          expect(response).to.be.an('array');
        })

        it("o objeto que está no array possui os elementos esperados", async () => {
          const products = await productsServices.allProducts();
          expect(products).to.be.deep.equal(productsMock.full);
        });
      });

      describe("#findProductsById", () => {
        describe("Quando a tabela `product` não tiver dados !", () => {
          beforeEach(() => {
            sinon.stub(productModel, "findProductsById").resolves([productsMock.empty]);
          });
  
          afterEach(() => {
            productModel.findProductsById.restore();
          });
  
          it("retorna um array vazio", async () => {
            const products = await productsServices.findProductsById();
            expect(products).to.be.equal(productsMock.empty);
          });
        });
  
        describe("Quando a tabela `product` tiver dados !", () => {
          beforeEach(() => {
            sinon.stub(productModel, "findProductsById").resolves([productsMock.full]);
          });
  
          afterEach(() => {
            productModel.findProductsById.restore();
          });
  
          it("o objeto que está no array possui os elementos esperados", async () => {
            const products = await productsServices.findProductsById();
            expect(products).to.be.deep.equal(productsMock.full);
          });
        });

        describe("#insertProduct", () => {
          describe("Quando a tabela `product` não tiver dados !", () => {
            beforeEach(() => {
              sinon.stub(productModel, "sameNameProduct").resolves(productsMock.empty);
              sinon.stub(productModel, "insertProduct").resolves(productsMock.full);
            });
    
            afterEach(() => {
              productModel.insertProduct.restore();
            });
    
            it("retorna um array vazio", async () => {
              const products = await productModel.sameNameProduct();
              expect(products).to.be.deep.equal(productsMock.empty);
            });
          });
    
          describe("Quando a tabela `product` tiver dados !", () => {
            beforeEach(() => {
              sinon.stub(productModel, "insertProduct").resolves(productsMock.full);
            });
    
            afterEach(() => {
              productModel.insertProduct.restore();
            });
            
            it('retorna um array', () => async () => {
              const response = await productsServices.insertProduct( );
              expect(response).to.be.an('array');
            })
    
            it("o objeto que está no array possui os elementos esperados", async () => {
              const products = await productsServices.insertProduct();
              expect(products).to.be.deep.equal(productsMock.full);
            });
          });
    });
  });
});
});
});