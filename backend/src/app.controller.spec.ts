import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

describe('App', () => {
  let appController: AppController, appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('Controller', () => {
    it('health_check', () => {
      expect(appController.health_check()).toEqual({ status: 'server is up' });
    });
    it('create_lead', async () => {
      const response = await appController.createLead();
      expect(response).not.toBeUndefined();
      expect(response.id).not.toBeUndefined();
      expect(typeof response.id).toBe('number');
    });
    it('create_contact', async () => {
      const response = await appController.createContact();
      expect(response).not.toBeUndefined();
      expect(response.id).not.toBeUndefined();
      expect(typeof response.id).toBe('number');
    });
    it('create_company', async () => {
      const response = await appController.createCompany();
      expect(response).not.toBeUndefined();
      expect(response.id).not.toBeUndefined();
      expect(typeof response.id).toBe('number');
    });
  });

  describe('Service', () => {
    it('health_check', () => {
      expect(appService.health_check()).toEqual({ status: 'server is up' });
    });
    it('updateToken', async () => {
      expect(await appService.updateToken()).toEqual(undefined);
    });
    it('sendPostReq', async () => {
      const response = await appService.sendPostReq('/api/v4/leads', {
        'Content-Type': 'application/json',
      });
      expect(response).not.toBeUndefined();
      expect(response['_embedded']).not.toBeUndefined();
      expect(response['_embedded']['leads']).not.toBeUndefined();
      expect(response['_embedded']['leads'][0]).not.toBeUndefined();
      expect(response['_embedded']['leads'][0].id).not.toBeUndefined();
      expect(typeof response['_embedded']['leads'][0].id).toBe('number');
    });
  });
});
