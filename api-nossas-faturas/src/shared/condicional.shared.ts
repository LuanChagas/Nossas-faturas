export function executeIfCondicionalPromisse<T>(
  condicional: boolean,
  funcao: () => Promise<T>,
): Promise<T | null> {
  if (condicional) {
    return funcao();
  }
  return Promise.resolve(null);
}
