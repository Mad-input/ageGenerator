export function calcularEdad(fechaNacimiento) {
  // Obtener la fecha actual
  let fechaActual = new Date();

  // Calcular la diferencia en milisegundos
  let diferencia = fechaActual - fechaNacimiento;

  // Convertir la diferencia a días
  let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  // Calcular años, meses y días
  let anos = Math.floor(dias / 365); //? "anos"significa años, no se utiliza la letra (ñ) por temas de lenguaje
  let meses = Math.floor((dias % 365) / 30);
  let diasRestantes = dias % 30;

  return {
    anos,
    meses,
    dias: diasRestantes,
  };
}
