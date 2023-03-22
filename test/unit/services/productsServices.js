const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require("../../../models/productModel");
const productsServices = require("../../../services/productsServices");

describe('Busca todos os products na camada Model', () => {
  describe('quando não existe nenhum produto', () => {

      before(() => {
          sinon.stub(productModel, 'getProducts')
            .resolves([]);
        });
        after(() => {
          productModel.getProducts.restore();
        });
      it('retorna um array', async () => {
          const result = await productsServices.getProductsServices();
          expect(result).to.be.an('array');
      })
      it('o array está vazio', async () => {
          const result = await productsServices.getProductsServices();
          expect(result).to.be.empty;
      })
  })
  describe('quando existe products na minha camada model', () => {
   const result = [
      {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
      },
   ]
   before(() => {
      sinon.stub(productModel, 'getProducts').resolves(result);
   })
   after(() => {
    productModel.getProducts.restore();
   })
   it('retorna um array', async () => {
      const result = await productsServices.getProductsServices();
      expect(result).to.be.an('array');
   })
   it('o array não esta vazio', async () => {
      const result = await productsServices.getProductsServices();
      expect(result).to.be.not.empty;
    })
    it('o array possui objetos', async () => {
      const [result] = await productsServices.getProductsServices();
      expect(result).to.be.an('object');
    })
    it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
      const [result] = await productsServices.getProductsServices();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
})

describe("Insere um novo produto no BD", () => {
describe("quando é inserido com sucesso", async () => {

const result = 
{
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
}
   before(() => {
     sinon.stub(productModel, "getProducts").resolves([result]);
     sinon.stub(productModel, "createProducts").resolves(result);
   });

   after(() => {
    productModel.getProducts.restore();
    productModel.createProducts.restore();
   });

   it("retorna um objeto", async () => {
     const response = await productsServices.validCreate();

     expect(response).to.be.a("object");
   });
 });

 describe("se aconteceu algum erro", async () => {
     before(() => {
      sinon.stub(productModel, "getProducts").resolves([true]);
      sinon.stub(productModel, "createProducts").resolves();
     });

     after(() => {
      productModel.getProducts.restore();
      productModel.createProducts.restore();
     });

     it('verifica se houve algum erro ', async () => {
       try{
       await productsServices.validCreate();
       } catch (err) {
         expect(err.message).to.be.equal('Product already exists');
       }
     })
   });
});


describe('Busca um products por ID especifico na camada model', () => {
  describe('Quando existe products com ID na minha camada model', () => {
      const id = 1;
      const result = 
         {
             id: 1,
             name: "Martelo de Thor",
             quantity: 10
         }

      before(() => {
         sinon.stub(productModel, 'getProductsById').resolves(result);
      })
      after(() => {
        productModel.getProductsById.restore();
      })
      it('o array não esta vazio', async () => {
         const result = await productsServices.getProductsByIdServices(id);
         expect(result).to.be.not.empty;
       })
       it('o array possui objetos', async () => {
         const result = await productsServices.getProductsByIdServices(id);
         expect(result).to.be.an('object');
       })
       it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
         const result = await productsServices.getProductsByIdServices(id);
         expect(result).to.be.includes.all.keys(
           'id',
           'name',
           'quantity',
         )
       })
     })

describe("se aconteceu algum erro", async () => {
  const idError = 20;
    before(() => {
      sinon.stub(productModel, "getProductsById").resolves([]);
    });
    after(() => {
      productModel.getProductsById.restore();
    });

    it('verifica se houve algum erro ', async () => {
      try{
      await productsServices.getProductsByIdServices(idError);
      } catch (err) {

        expect(err.message).to.be.equal('Product not found');
      }
    })
  });
})

describe("atualiza um novo produto no BD", () => {
describe("quando é atualizado com sucesso", async () => {
  const result = 
  {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
  }
 const id = 1;
  before(() => {
    sinon.stub(productModel, "getProductsById").resolves([result]);
    sinon.stub(productModel, "updateProducts").resolves(result);
  });

  after(() => {
    productModel.getProductsById.restore();
    productModel.updateProducts.restore();
  });

  it('é um array possui objetos', async () => {
    const result = await productsServices.validUpdate(id);
    expect(result).to.be.an('object');
  })
  it('o objeto não esta vazio', async () => {
    const result = await productsServices.validUpdate(id);
    expect(result).to.be.not.empty;
  })
});

describe("se aconteceu algum erro", async () => {
  const idError = 20;
    before(() => {
      sinon.stub(productModel, "getProductsById").resolves([]);
      sinon.stub(productModel, "updateProducts").resolves();
    });

    after(() => {
      productModel.getProductsById.restore();
      productModel.updateProducts.restore();
    });

    it('verifica se houve algum erro ', async () => {
      try{
      await productsServices.validUpdate(idError);
      } catch (err) {

        expect(err.message).to.be.equal('Product not found');
      }
    })
  });
});

describe("deleta um novo produto no BD", () => {
describe("quando é deletado com sucesso", async () => {
const obj = {
  id: 1,
}
  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(productModel, "getProductsById").resolves([[]]);
    sinon.stub(productModel, "deleteProducts").resolves(ID_EXAMPLE);
  });

  after(() => {
    productModel.getProductsById.restore();
    productModel.deleteProducts.restore();
  });

  it('verifica se houve a delete ', async () => {
    const result = await productsServices.validDelete(obj.id);
    expect(result).to.be.equal(true);
  })
});

describe("se aconteceu algum erro", async () => {
  const idError = 'ss';
  before(() => {
    sinon.stub(productModel, "getProductsById").resolves([]);
    sinon.stub(productModel, "deleteProducts").resolves();
  });

  after(() => {
    productModel.getProductsById.restore();
    productModel.deleteProducts.restore();
  });

  it('verifica se houve algum erro ', async () => {
    try{
    await productsServices.validDelete(idError);
    } catch (err) {
      expect(err.message).to.be.equal('Product not found');
    }
  })
})
});

describe("controlando updateQuantiProductsDelete", () => {
describe("quando é a quantidade é atualizada com sucesso", async () => {
  const result1 = [
  {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
  } ]
 const id = 1;
  before(() => {
    sinon.stub(productModel, "updateProductsQuantityDelete").resolves({id: 2});
  });

  after(() => {
    productModel.updateProductsQuantityDelete.restore();
  });

  it('verifica se houve a delete ', async () => {
    const result = await productsServices.updateQuantiProductsDelete(result1);
    expect(result).to.be.equal(undefined);
  })
});
});