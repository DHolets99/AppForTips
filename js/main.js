const form = document.querySelector('.settings_form');
const bill = document.querySelector('.bill_input');
const person = document.querySelector('.people_input');
const btnReset = document.querySelector('.button_reset');
const tipsVariants = document.querySelector('.tip_variants');
const variant = document.querySelectorAll('.tip_input');
const customVariant = document.querySelector('.input_custom');
const tipPerson = document.querySelector('.tip_amount-value');
const totalPerson = document.querySelector('.total_amount-value');
const inputField = document.querySelectorAll('.input');
const span = document.querySelector('.span_in_label');

let billValue = 0;
let tips = 0;
let personValue = 0;
let valueTipPerson = 0;
let valueTotalPerson = 0;

const addClassBtn = () => {
    btnReset.classList.add('button_reset-active');
}

const removeClassBtn = () => {
    btnReset.classList.remove('button_reset-active');
}

const toggleClassBtn = () => {
    billValue = +bill.value;
    personValue = +person.value;
    if (billValue > 0 || tips > 0 || personValue > 0) {
        addClassBtn();
        checkFields();
    } else {
        removeClassBtn();
    };
}

const showError = (e) => {
    let item = e.target.previousElementSibling.lastChild.previousElementSibling;
    if (e.target.value == 0) {
        e.target.classList.add('input_error');
        item.style.cssText = 'opacity: 100';
    } else {
        e.target.classList.remove('input_error');
        item.style.cssText = 'opacity: 0';
    }
}

const checkBill = () => {
    if (billValue != billValue.toFixed(2)) {
        billValue = billValue.toFixed(2);
        bill.value = billValue;
    }
}

const checkPerson = () => {
    if (personValue != personValue.toFixed(0)) {
        personValue = personValue.toFixed(0);
        person.value = personValue;
    }
}

const checkFields = () => {
        checkBill();
        checkPerson();
    if (billValue > 0 && personValue > 0) {
        changeAmount();
    }
}

const toggleClassInput = (e) => {
    let input = e.target;
    e.target.value = e.target.value.replace(/[^0-9,%]/g, '');
    variant.forEach ( (item) => item.classList.remove('tip_input-checked'));
    if (input != tipsVariants && input != customVariant) {
        input.classList.toggle('tip_input-checked');
        customVariant.value = '';
    };
    getTips (input);
}

const getTips = (e) => {
    if (e == customVariant) {
        tips = +e.value;
    } else {
        tips = parseFloat(e.value);
    }
    checkFields();
}

const calcTipPerson = () => {
    valueTipPerson = (billValue * +tips / 100) / personValue;
    return valueTipPerson.toFixed(2);
}

const calcTotalPerson = () => {
    valueTotalPerson = (billValue / personValue) + valueTipPerson;
    return valueTotalPerson.toFixed(2);
}

const changeAmount = () => {
    tipPerson.innerHTML = `$ ${calcTipPerson()}`;
    totalPerson.innerHTML = `$ ${calcTotalPerson()}`;
}

const resetAll = () => {
    removeClassBtn();
    bill.value = '';
    customVariant.value = '';
    person.value = '';
    tipPerson.innerHTML = `$ 0.00`;
    totalPerson.innerHTML = `$ 0.00`;
    variant.forEach ( (item) => item.classList.remove('tip_input-checked'));
}


form.addEventListener('input', toggleClassBtn);
customVariant.addEventListener('input', toggleClassInput);
tipsVariants.addEventListener('click', toggleClassInput);
btnReset.addEventListener('click', resetAll);
bill.addEventListener('input', showError);
person.addEventListener('input', showError);