import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesDetailsService } from './invoices_details.service';

describe('InvoicesDetailsService', () => {
  let service: InvoicesDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesDetailsService],
    }).compile();

    service = module.get<InvoicesDetailsService>(InvoicesDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
