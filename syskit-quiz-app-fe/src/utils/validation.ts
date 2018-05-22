import { fieldRequiredMessage, emailInvalid } from "common/strings";

export function emptyAndNonWhitespaceInput(newInput: string) {
    let isEmpty = false;

    if (!newInput) {
        isEmpty = true;
    } else if (!newInput.trim()) {
        isEmpty = true;
    }

    return isEmpty ? fieldRequiredMessage : null;
}

export function emailFormValidation(email: string) {
    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const check = emptyAndNonWhitespaceInput(email);
    if (check) {
        return check;
    }

    if (!regex.test(email)) {
        return emailInvalid;
    }

    return null;
}
