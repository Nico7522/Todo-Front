export const isTokenExpiress = (tokenExpTime: number): boolean => {
  if (new Date(tokenExpTime * 1000) < new Date()) return true;

  return false;
};
