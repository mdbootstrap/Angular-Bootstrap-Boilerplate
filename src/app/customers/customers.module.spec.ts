import { CustomersModule } from './customers.module';

describe('CustomersModule', () => {
  let customersModule: CustomersModule;

  beforeEach(() => {
    customersModule = new CustomersModule();
  });

  it('should create an instance', () => {
    expect(customersModule).toBeTruthy();
  });
});
