import { Test, TestingModule } from '@nestjs/testing';
import { PropertyAddressService } from './property-address.service';

describe('PropertyAddressService', () => {
  let service: PropertyAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyAddressService],
    }).compile();

    service = module.get<PropertyAddressService>(PropertyAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
