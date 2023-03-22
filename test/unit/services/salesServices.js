const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const productModel = require('../../../models/productModel');
const salesServices = require('../../../services/salesServices');
const productsServices = require('../../../services/productsServices');

describe('Busca todos as vendas na camada model', () => {
  describe('quando não existe nenhuma venda', () => {
      const result = [];
      before(() => {
          sinon.stub(saleModel, 'getSales').resolves(result);
      })
      after(() => {
        saleModel.getSales.restore();
      })
      it('retorna um array', async () => {
          const result = await salesServices.getSalesServices();
          expect(result).to.be.an('array');
      })
      it('o array está vazio', async () => {
          const result = await salesServices.getSalesServices();
          expect(result).to.be.empty;
      })
  })
  describe('quando existe vendas no meu banco', () => {
   const result = [
      {
          saleId: 1,
          date: "2022-05-07T01:12:42.000Z",
          productId: 1,
          quantity: 5
      },
   ]
   before(() => {
      sinon.stub(saleModel, 'getSales').resolves(result);
   })
   after(() => {
    saleModel.getSales.restore();
   })
   it('retorna um array', async () => {
      const result = await salesServices.getSalesServices();
      expect(result).to.be.an('array');
   })
   it('o array não esta vazio', async () => {
      const result = await salesServices.getSalesServices();
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await salesServices.getSalesServices();
      expect(result).to.be.an('object');
    })
    it('o objeto que esta no array contem os atributos saleId, date, productId, quantity', async () => {
      const [result] = await salesServices.getSalesServices();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    })
  })
})

describe('Busca uma venda por ID especifico', () => {
  describe('Quando não existe a venda com o ID especificado', () => {
      const result = [[]];
      const id = 20;
      before(() => {
          sinon.stub(saleModel, 'getSalesById').resolves(result);
      })
      after(() => {
        saleModel.getSalesById.restore();
      })
      it('retorna um array', async () => {
          const result = await salesServices.getSalesByIdServices(id);
          expect(result).to.be.an('array');
      })
      it('o array está vazio', async () => {
          const [result] = await salesServices.getSalesByIdServices(id);
          expect(result).to.be.empty;
      })
  })
  describe('Quando existe a venda com ID no meu banco', () => {
      const saleId = 1;
      const result = [
          {
              date: "2022-05-07T01:12:42.000Z",
              productId: 1,
              quantity: 5
          },
       ]
      before(() => {
         sinon.stub(saleModel, 'getSalesById').resolves(result);
      })
      after(() => {
        saleModel.getSalesById.restore();
      })
      it('retorna um array', async () => {
          const result = await salesServices.getSalesByIdServices(saleId);
         expect(result).to.be.an('array');
      })
      it('o array não esta vazio', async () => {
          const result = await salesServices.getSalesByIdServices(saleId);
         expect(result).to.be.not.empty;
       })
       it('o array possui objetos', async () => {
          const [result] = await salesServices.getSalesByIdServices(saleId);
         expect(result).to.be.an('object');
       })
       it('o objeto que esta no array contem os atributos date, productId, quantity', async () => {
          const [result] = await salesServices.getSalesByIdServices(saleId);
          expect(result).to.be.includes.all.keys(
            'date',
            'productId',
            'quantity'
          )
        })
     })

     describe("se aconteceu algum erro", async () => {
      const idError = 20;
        before(() => {
          sinon.stub(saleModel, "getSalesById").resolves([]);
        });

        after(() => {
          saleModel.getSalesById.restore();
        });

        it('verifica se houve algum erro ', async () => {
          try{
          await salesServices.getSalesByIdServices(idError);
          } catch (err) {

            expect(err.message).to.be.equal('Sale not found');
          }
        })
      });
})

describe("Insere uma nova venda no BD", () => {
  describe("quando é inserido com sucesso", async () => {
    const result =  [
        {
          productId: 1,
          quantity: 3
        }
      ]
      const resultProduct = 
         {
             id: 1,
             name: "Martelo de Thor",
             quantity: 10
         }
       before(() => {
         sinon.stub(productModel, "getProductsById").resolves([resultProduct]);
         sinon.stub(saleModel, "createSales").resolves([{id: 1}]);
         sinon.stub(saleModel, "createSalesProducers").resolves([result]);
         sinon.stub(saleModel, "getSalesAndProducts").resolves(result);
       });

       after(() => {
        productModel.getProductsById.restore();
         saleModel.createSales.restore();
         saleModel.createSalesProducers.restore();
         saleModel.getSalesAndProducts.restore();
       });

       it("retorna um objeto", async () => {
         const response = await salesServices.createSales(result);

         expect(response).to.be.a("object");
       });
     });

     describe("se aconteceu algum erro", async () => {
      const result1 =  [
          {
            productId: 1,
            quantity: 3
          }
        ]
        const resultProduct = 
         {
             id: 1,
             name: "Martelo de Thor",
             quantity: 10
         }
        before(() => {
         sinon.stub(productModel, "getProductsById").resolves([resultProduct]);
         sinon.stub(saleModel, "createSales").resolves({id: 20});
         sinon.stub(saleModel, "createSalesProducers").resolves();
         sinon.stub(saleModel, "getSalesAndProducts").resolves([]);
        });

        after(() => {
          productModel.getProductsById.restore();
          saleModel.createSales.restore();
          saleModel.createSalesProducers.restore();
          saleModel.getSalesAndProducts.restore();
        });

        it('verifica se houve algum erro ', async () => {
          try{
          await salesServices.createSales(result1);
          } catch (err) {
            expect(err.message).to.be.equal('Sale not found');
          }
        })
      });
  });

describe("atualiza uma nova venda no BD", () => {
      describe("quando é atualizado com sucesso", async () => {
        const result1 = 
        [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
        before(() => {
          sinon.stub(saleModel, "getSalesById").resolves({id: 1});
          sinon.stub(saleModel, "updateSales").resolves([{id: 1}]);
        });

        after(() => {
          saleModel.getSalesById.restore();
          saleModel.updateSales.restore();
        });

        it('é um array possui objetos', async () => {
          const result = await salesServices.updateSales(result1,1);
          expect(result).to.be.an('object');
        })
        it('o objeto não esta vazio', async () => {
          const result = await salesServices.updateSales(result1,1);
          expect(result).to.be.not.empty;
        })
      });
    });
describe("deleta uma venda no BD", () => {
      describe("quando é deletado com sucesso", async () => {
      const obj = {
        id: 10,
      }
      const id = 1;
        before(() => {
          sinon.stub(saleModel, "getSalesById").resolves([id]);
          sinon.stub(saleModel, "deleteSales").resolves(id);
          sinon.stub(productsServices, "updateQuantiProductsDelete").resolves(id);
        });

        after(() => {
          saleModel.getSalesById.restore();
          saleModel.deleteSales.restore();
          productsServices.updateQuantiProductsDelete.restore();
        });

        it('verifica se houve a delete  ', async () => {
          const result = await salesServices.validDelete({id: 1});
          expect(result).to.be.equal(true);
        })
      });

      describe("se aconteceu algum erro", async () => {
        const idError = 'ss';
        before(() => {
          sinon.stub(saleModel, "getSalesById").resolves([]);
          sinon.stub(saleModel, "deleteSales").resolves();
        });

        after(() => {
          saleModel.getSalesById.restore();
          saleModel.deleteSales.restore();
        });

        it('verifica se houve algum erro ', async () => {
          try{
          await salesServices.validDelete(idError);
          } catch (err) {
            expect(err.message).to.be.equal('Sale not found');
          }
        })
      })
    });

describe("Controlando a função verificProducts", () => {
      describe("quando não tem problema na função", async () => {
        const result1 =
          {
            productId: 1,
            quantity: 3
          }
        before(() => {
          sinon.stub(productModel, "getProductsById").resolves([result1]);
        });

        after(() => {
          productModel.getProductsById.restore();
        });

        it('se ocorreu tudo certo ', async () => {
          const [result] = await salesServices.verificProducts([result1]);
          expect(result).to.be.equal(true);
        })
      });

      describe("se aconteceu algum erro", async () => {
        const result1 =  [
          {
            productId: 1,
            quantity: 3
          }
        ]
        before(() => {
          sinon.stub(productModel, "getProductsById").resolves([false]);
        });

        after(() => {
          productModel.getProductsById.restore();
        });

        it('verifica se houve algum erro ', async () => {
          try{
          await salesServices.verificProducts(result1);
          } catch (err) {
            expect(err.message).to.be.equal('Such amount is not permitted to sell');
          }
        })
      })
    });