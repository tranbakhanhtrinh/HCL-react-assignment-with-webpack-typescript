type Rules = {
    required?: boolean,
    isNumeric?: boolean,
}

export const checkValidity = (value: string | number, rules: Rules): {isValid: boolean, message: string} => {
    let isValid = true;
    let message = "";
    if (!rules) {
        return {isValid, message};
    }
    if (rules.required) {
        isValid = value.toString().trim() !== "" && isValid;
        isValid ? message = "" : message = "This field can not be empty";
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value.toString()) && isValid;
        isValid ? message = "" : message = "This field contains number only";
    }
    return {isValid, message};
};
