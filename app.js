const BUTTON_5 = document.querySelector(".tip_buttons button:nth-child(1)");
const BUTTON_10 = document.querySelector(".tip_buttons button:nth-child(2)");
const BUTTON_15 = document.querySelector(".tip_buttons button:nth-child(3)");
const BUTTON_25 = document.querySelector(".tip_buttons button:nth-child(4)");
const BUTTON_50 = document.querySelector(".tip_buttons button:nth-child(5)");
const BUTTON_CUSTOM = document.querySelector(
    ".tip_buttons button:nth-child(6)"
);
const NUMBER_OF_PEOPLE = document.querySelector(".chooser-number");
const BILL = document.querySelector(".chooser-bill");

const RESULT_AMOUNT = document.querySelector(".result_amount_value");
const RESULT_TOTAL = document.querySelector(".result_total_value");
const RESET_BUTTON = document.querySelector(".reset");

let billInput = document.querySelector(".bill_input");
let numberOfPeopleInput = document.querySelector(".number_of_people_input");
let customInput = document.querySelector(".custom");

const clearCalc = () => {
    numberOfPeopleInput.style.borderColor = "transparent";
    billInput.style.borderColor = "transparent";

    if (NUMBER_OF_PEOPLE.children.length !== 0) {
        NUMBER_OF_PEOPLE.removeChild(NUMBER_OF_PEOPLE.lastElementChild);
    } else if (BILL.children.length !== 0) {
        BILL.removeChild(BILL.lastElementChild);
    }
};

const checkInputs = () => {
    const bill = billInput.value;
    const num = numberOfPeopleInput.value;
    //console.log(bill);
    //console.log(num);

    if (num === "" || num === "0") {
        //console.log("can't be zero!");
        numberOfPeopleInput.style.borderColor = "var(--color-red)";
        const infoElement = document.createElement("span");
        infoElement.classList.add("info-element");
        infoElement.textContent = "Can't be zero!";

        NUMBER_OF_PEOPLE.appendChild(infoElement);
        return false;
    } else if (num < 0) {
        numberOfPeopleInput.style.borderColor = "var(--color-red)";
        const infoElement = document.createElement("span");
        infoElement.classList.add("info-element");
        infoElement.textContent = "Can't be minus!";

        NUMBER_OF_PEOPLE.appendChild(infoElement);
        return false;
    } else if (bill < 0) {
        billInput.style.borderColor = "var(--color-red)";
        const infoElement = document.createElement("span");
        infoElement.classList.add("info-element");
        infoElement.textContent = "Can't be minus!";

        BILL.appendChild(infoElement);

        return false;
    } else {
        return true;
    }
};
const countTipAndTotal = (percent) => {
    clearCalc();
    enabledResetButton();

    if (checkInputs()) {
        const multi = Number((percent / 100).toFixed(2));
        const bill = billInput.value;
        const num = numberOfPeopleInput.value;

        let resultAmount = (bill * (1 + multi) - bill) / num;
        resultAmount = resultAmount.toFixed(2);
        //console.log(resultAmount);
        RESULT_AMOUNT.textContent = `$${resultAmount}`;

        let resultTotal = (bill * (1 + multi)) / num;
        resultTotal = resultTotal.toFixed(2);
        //console.log(resultTotal);
        RESULT_TOTAL.textContent = `$${resultTotal}`;
    }
};

const activeButton = (button) => {
    deactiveButtons();
    button.style.color = "var(--color-very-dark-cyan)";
    button.style.backgroundColor = "var(--color-strong-cyan)";
};
const deactiveButtons = () => {
    BUTTON_5.style.color = "var(--very-light-grayish-cyan)";
    BUTTON_10.style.color = "var(--very-light-grayish-cyan)";
    BUTTON_15.style.color = "var(--very-light-grayish-cyan)";
    BUTTON_25.style.color = "var(--very-light-grayish-cyan)";
    BUTTON_50.style.color = "var(--very-light-grayish-cyan)";
    //BUTTON_CUSTOM.style.color = "var(--very-light-grayish-cyan)";
    BUTTON_5.style.backgroundColor = "var(--color-very-dark-cyan)";
    BUTTON_10.style.backgroundColor = "var(--color-very-dark-cyan)";
    BUTTON_15.style.backgroundColor = "var(--color-very-dark-cyan)";
    BUTTON_25.style.backgroundColor = "var(--color-very-dark-cyan)";
    BUTTON_50.style.backgroundColor = "var(--color-very-dark-cyan)";
    //BUTTON_CUSTOM.style.backgroundColor = "var(--color-very-dark-cyan)";
};

const count5percent = () => {
    activeButton(BUTTON_5);
    countTipAndTotal(5);
};
const count10percent = () => {
    activeButton(BUTTON_10);
    countTipAndTotal(10);
};
const count15percent = () => {
    activeButton(BUTTON_15);
    countTipAndTotal(15);
};
const count25percent = () => {
    activeButton(BUTTON_25);
    countTipAndTotal(25);
};
const count50percent = () => {
    activeButton(BUTTON_50);
    countTipAndTotal(50);
};
const countCustomPercentC = () => {
    deactiveButtons();
    countTipAndTotal(customInput.value);
};
const countCustomPercentK = (e) => {
    deactiveButtons();
    if (e.key === "Enter") {
        countTipAndTotal(customInput.value);
    }
};

const resetCounts = () => {
    clearCalc();
    disabledResetButton();
    deactiveButtons();

    billInput.value = "";
    numberOfPeopleInput.value = "";
    customInput.value = "";

    RESULT_AMOUNT.textContent = "$0.00";
    RESULT_TOTAL.textContent = "$0.00";
};
const disabledResetButton = () => {
    RESET_BUTTON.disabled = true;
};
const enabledResetButton = () => {
    RESET_BUTTON.disabled = false;
};

BUTTON_5.addEventListener("click", count5percent);
BUTTON_10.addEventListener("click", count10percent);
BUTTON_15.addEventListener("click", count15percent);
BUTTON_25.addEventListener("click", count25percent);
BUTTON_50.addEventListener("click", count50percent);
BUTTON_CUSTOM.addEventListener("click", countCustomPercentC);
BUTTON_CUSTOM.addEventListener("keypress", countCustomPercentK);
RESET_BUTTON.addEventListener("click", resetCounts);
