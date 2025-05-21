

export const genSalt = jest.fn(() => Promise.resolve('salt'));
export const hash = jest.fn(() => Promise.resolve('hashedPassword'));
export const compare = jest.fn(() => Promise.resolve(true));
