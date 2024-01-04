const esNumerico = (valor) => {
  return !isNaN(parseFloat(valor)) && isFinite(valor);
};

const esBisiesto = (year) => {
  return year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0;
};

export { esNumerico, esBisiesto };
