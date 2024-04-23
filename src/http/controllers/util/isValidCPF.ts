export function isValidCPF(cpf: string): boolean {
  // Remover caracteres especiais e deixar apenas os números
  cpf = cpf.replace(/[^\d]/g, '')

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verificar se todos os dígitos são iguais, o que invalidaria o CPF
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  // Calcular o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = soma % 11
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

  // Verificar se o primeiro dígito verificador é válido
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false
  }

  // Calcular o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = soma % 11
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto

  // Verificar se o segundo dígito verificador é válido
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false
  }

  // Se passou por todas as verificações, o CPF é válido
  return true
}
