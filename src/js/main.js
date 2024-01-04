import { calcularEdad } from "./calcularEdad.js";
import { esBisiesto, esNumerico } from "./condition.js";
// HTML elements
const btnGenerate = document.getElementById("btnGenerate");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const emptySpan = document.querySelectorAll(".empty");

const yearS = document.getElementById("yearS");
const monthS = document.getElementById("monthS");
const dayS = document.getElementById("daysS");

/**
 *
 * @param {string} msg Meessage error
 * @param {Array} elements HTMLElement
 */

const showError = (msg, elements) => {
  // recorrer elemntos donde se encuentre el error
  for (let elem of elements) {
    elem.classList.add("error");
    // Mostrar solo el mensaje donde esta el error
    emptySpan[elem.dataset.id].innerHTML = msg;
    // despues de 2 segundos remover la clase y el mensaje
    setTimeout(() => {
      elem.classList.remove("error");
      emptySpan[elem.dataset.id].innerHTML = "";
    }, 2000);
  }
};

const renderDate = () => {
  // Se parsean los datos ingresados
  let yearN = parseInt(year.value);
  let monthN = parseInt(month.value);
  let dayN = parseInt(day.value);

  // Se verifica si los datos ingresados son Numericos
  if (esNumerico(yearN) && esNumerico(monthN) && esNumerico(dayN)) {
    let yearN = parseInt(year.value);
    let monthN = parseInt(month.value);
    let dayN = parseInt(day.value);
    let anoActual = new Date().getFullYear();

    if (dayN < 1 || dayN > 31 || monthN < 1 || monthN > 12)
      return showError(`Invalid date ${dayN || monthN}`, [day, month]);
    else if (yearN > anoActual || yearN < 1950)
      return showError("Invalid: 1950 - actually Year", [year]);

    //Se verifica si el años es bisiesto, si es bisiesto algunos meses no tienen 31 dias
    if (
      (esBisiesto(yearN) && monthN == 3) ||
      monthN == 4 ||
      monthN == 6 ||
      monthN == 9 ||
      (monthN == 11 && dayN > 30)
    ) {
      showError("only 30 days", [day]);
    }
    // Severifica si el mes es febrero, en año bisiesto solo tiene 29 dias
    else if (esBisiesto(yearN) && monthN == 2 && dayN > 29)
      showError("only 29 days", [day]);
    // No es biciesto
    else {
      let date = `${yearN} ${monthN} ${dayN}`;
      const fechaDeNacimiento = new Date(date);
      const { anos, meses, dias } = calcularEdad(fechaDeNacimiento);

      yearS.innerHTML = anos;
      monthS.innerHTML = meses;
      dayS.innerHTML = dias;
    }
  }
  // si se ingresan datos erroneos motrar un error
  else {
    showError("Invalid dates", [day, year, month]);
  }
};

btnGenerate.addEventListener("click", () => {
  renderDate();
});
