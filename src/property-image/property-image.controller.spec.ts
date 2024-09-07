import { Test, TestingModule } from '@nestjs/testing';
import { PropertyImageController } from './property-image.controller';
import { PropertyImageService } from './property-image.service';

describe('PropertyImageController', () => {
  let controller: PropertyImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyImageController],
      providers: [PropertyImageService],
    }).compile();

    controller = module.get<PropertyImageController>(PropertyImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
