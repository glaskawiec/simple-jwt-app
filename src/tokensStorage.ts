const validTokens: Array<string> = [];

export const add = (token: string) => {
  validTokens.push(token);
};

export const isValid = (token: string) => validTokens.includes(token);
