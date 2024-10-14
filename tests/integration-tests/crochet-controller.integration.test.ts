import request from 'supertest';
import express, { Express } from 'express';
import { CreateCrochetUseCase } from '../../src/application/use-cases/create-crochet-use-case';
import { ListAllCrochetsUseCase } from '../../src/application/use-cases/list-all-crochets-use-case';
import { UpdateCrochetUseCase } from '../../src/application/use-cases/update-crochet-use-case';
import { DeleteCrochetUseCase } from '../../src/application/use-cases/delete-crochet-use-case';
import { CrochetController } from '../../src/interface/crochet-controller';

describe('CrochetController Integration Tests', () => {
  let app: Express;
  let createCrochetUseCase: jest.Mocked<CreateCrochetUseCase>;
  let listAllCrochetsUseCase: jest.Mocked<ListAllCrochetsUseCase>;
  let updateCrochetUseCase: jest.Mocked<UpdateCrochetUseCase>;
  let deleteCrochetUseCase: jest.Mocked<DeleteCrochetUseCase>;

  beforeEach(() => {
    // Mock dos casos de uso
    createCrochetUseCase = {
      execute: jest.fn().mockReturnValue({ id: '1', name: 'Yarn A', created_at: new Date() }),
      crochetRepository: jest.fn(),
      getDate: jest.fn(),
    } as unknown as jest.Mocked<CreateCrochetUseCase>;
    listAllCrochetsUseCase = {
      execute: jest.fn().mockResolvedValue([{ id: '1', name: 'Yarn A', created_at: new Date() }]),
      crochetRepository: jest.fn(),
      getDate: jest.fn(),
    } as unknown as jest.Mocked<ListAllCrochetsUseCase>;
    updateCrochetUseCase = {
      execute: jest.fn().mockResolvedValue({ id: '1', name: 'Yarn B', created_at: new Date() }),
      crochetRepository: jest.fn(),
      getDate: jest.fn(),
    } as unknown as jest.Mocked<UpdateCrochetUseCase>;
    deleteCrochetUseCase = {
      execute: jest.fn().mockResolvedValue(true),
      crochetRepository: jest.fn(),
      getDate: jest.fn(),
    } as unknown as jest.Mocked<DeleteCrochetUseCase>;

    const crochetController = new CrochetController(
      createCrochetUseCase,
      listAllCrochetsUseCase,
      updateCrochetUseCase,
      deleteCrochetUseCase
    );

    app = express();
    app.use(express.json());

    // Rotas
    app.post('/crochet', (req, res) => crochetController.create(req, res));
    app.get('/crochet', (req, res) => crochetController.listAll(req, res));
    app.put('/crochet/:id', (req, res) => crochetController.update(req, res));
    app.delete('/crochet/:id', (req, res) => crochetController.delete(req, res));
  });

  it('should create a new crochet', async () => {
    const newCrochet = { name: 'Yarn A' };

    const response = await request(app)
      .post('/crochet')
      .send(newCrochet)
      .expect(201);

    expect(response.body).toEqual(expect.objectContaining({ name: 'Yarn A' }));
    expect(createCrochetUseCase.execute).toHaveBeenCalledWith(newCrochet);
  });

  it('should list all crochets', async () => {
    const response = await request(app)
      .get('/crochet')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(listAllCrochetsUseCase.execute).toHaveBeenCalled();  // Agora funciona corretamente
  });

  it('should update a crochet', async () => {
    const updatedCrochet = { name: 'Yarn B' };

    const response = await request(app)
      .put('/crochet/1')
      .send(updatedCrochet)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Crochet $(id) updated with success' })
    );
    expect(updateCrochetUseCase.execute).toHaveBeenCalledWith('1', updatedCrochet);
  });

  it('should delete a crochet', async () => {
    const response = await request(app)
      .delete('/crochet/1')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Crochet $(id) deleted with success' })
    );
    expect(deleteCrochetUseCase.execute).toHaveBeenCalledWith('1');
  });
});
