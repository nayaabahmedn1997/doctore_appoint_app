
export const sign = jest.fn(() => 'mockedToken');
export const verify = jest.fn(() => ({ userId: '123' }));