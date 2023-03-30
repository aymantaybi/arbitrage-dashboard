export function getDomainEnvVariables(domain: string) {
  const entries = Object.entries(process.env);
  return entries.filter((entry) => entry[0].startsWith(domain));
}
