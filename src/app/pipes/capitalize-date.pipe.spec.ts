import { CapitalizeDatePipe } from './capitalize-date.pipe';

describe('CapitalizeDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeDatePipe();
    expect(pipe).toBeTruthy();
  });
});
