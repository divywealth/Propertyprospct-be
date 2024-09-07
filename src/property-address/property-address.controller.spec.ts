import { Test, TestingModule } from '@nestjs/testing';
import { PropertyAddressController } from './property-address.controller';
import { PropertyAddressService } from './property-address.service';

describe('PropertyAddressController', () => {
  let controller: PropertyAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyAddressController],
      providers: [PropertyAddressService],
    }).compile();

    controller = module.get<PropertyAddressController>(PropertyAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
