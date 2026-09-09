import { LoginFieldsData, LoginValidationResult } from '@playwright-features/auth/types/index';
import { validateEmailFormat } from '@playwright-shared/types/validators/email.validator';

export function validateLoginInput(data: LoginFieldsData): LoginValidationResult {
    const e = data.email ?? '';
    const p = data.password ?? '';
    const emailValidation = validateEmailFormat(e);
    if (emailValidation) {
        return emailValidation;
    }
    if (!e && !p) {
        return {
            type: 'missing_email_and_password',
            message: 'Please fill out this field.'
        };
    }
    if (!p) {
        return {
            type: 'missing_password',
            message: 'Please fill out this field.'
        };
    }
    return {
        type: 'invalid_credentials',
        message: 'Your email or password is incorrect!'
    };
}