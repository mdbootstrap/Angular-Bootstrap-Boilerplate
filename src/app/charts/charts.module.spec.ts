import { ChartsDataModule } from './charts.module';

describe('ChartsModule', () => {
  let chartsModule: ChartsDataModule;

  beforeEach(() => {
    chartsModule = new ChartsDataModule();
  });

  it('should create an instance', () => {
    expect(chartsModule).toBeTruthy();
  });
});
