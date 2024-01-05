import { calcularEdad } from "./calcularEdad.js";
import { esBisiesto } from "./condition.js";
// HTML elements
// atajo
const $ = (selector) => document.querySelector(selector);
const btnGenerate = $("#btnGenerate");
const year = $("#year");
const month = $("#month");
const day = $("#day");
const emptySpan = document.querySelectorAll(".empty");

const yearS = $("#yearS");
const monthS = $("#monthS");
const dayS = $("#daysS");

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
  if (isNaN(yearN) || isNaN(monthN) || isNaN(dayN)) {
    // si se ingresan datos erroneos motrar un error
    showError("Invalid dates", [day, year, month]);
  } else {
    let anoActual = new Date().getFullYear();

    if (dayN < 1 || dayN > 31 || monthN < 1 || monthN > 12)
      return showError(`Invalid date ${dayN || monthN}`, [day, month]);
    else if (yearN > anoActual || yearN < 1950)
      return showError("Invalid: 1950 - actually Year", [year]);

    //Se verifica si el años es bisiesto, si es bisiesto algunos meses no tienen 31 dias
    if (esBisiesto(yearN) && monthN == 3 && dayN > 30) {
      showError("only 30 days", [day]);
    }
    // Severifica si el mes es febrero, en año bisiesto solo tiene 29 dias
    else if (esBisiesto(yearN) && monthN == 2 && dayN > 29)
      showError("only 29 days", [day]);
    // No es bisiesto
    else {
      let date = `${yearN} ${monthN} ${dayN}`;
      const fechaDeNacimiento = new Date(date);
      const { anos, meses, dias } = calcularEdad(fechaDeNacimiento);

      yearS.innerHTML = anos;
      monthS.innerHTML = meses;
      dayS.innerHTML = dias;
    }
  }
};

btnGenerate.addEventListener("click", () => {
  renderDate();
});
