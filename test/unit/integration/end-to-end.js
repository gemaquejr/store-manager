const sinon = require('sinon');
const { expect } = require('chai');

const productsMock = require("../mocks/productsMock");

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../app')

const connection = require('../../../models/connection');

chai.use(chaiHttp);

describe('API', () => {
    describe('GET /products', () => {
        describe('Quando não existem dados na tabela products', () => {
            beforeEach(() => {      
                sinon.stub(connection, 'execute').resolves([productsMock.empty])
              });

              afterEach(() => {
                connection.execute.restore();
              });

            it('deve responder com o status 200', async () => {
                const response = await chai.request(app).get('/products');
                expect(response.status).to.be.equal(200);
            });

            it('deve responder com um array vazio no body', async () => {
                const response = await chai.request(app).get('/products');
                expect(response.body).to.be.deep.equal(productsMock.empty);
            });
        });
        describe('Quando existem dados na tabela', () => {
            beforeEach(() => {      
                sinon.stub(connection, 'execute').resolves([productsMock.full])
              });

              afterEach(() => {
                connection.execute.restore();
              });

              it('deve responder com o status 200', async () => {
                const response = await chai.request(app).get('/products');
                expect(response.status).to.be.equal(200);
            });
            
            it('deve responder com os elementos esperados no body', async () => {
                const response = await chai.request(app).get('/products');
                expect(response.body).to.be.deep.equal(productsMock.full);
            });
        })
    });
});