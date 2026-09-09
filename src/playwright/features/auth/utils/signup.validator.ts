import { SignupFieldsData, SignupValidationResult } from '@playwright-features/auth/types/index';
import { validateEmailFormat } from '@playwright-shared/types/validators/email.validator';

export function validateSignupInput(data: SignupFieldsData): SignupValidationResult {
    const n = data.name ?? '';
    const e = data.email ?? '';
    const emailValidation = validateEmailFormat(e);
    if (emailValidation) {
        return emailValidation;
    }
    if (!n && !e) {
        return {
            type: 'missing_name_and_email',
            message: 'Please fill out this field.'
        };
    }
    if (!n) {
        return {
            type: 'missing_name',
            message: 'Please fill out this field.'
        };
    }
    if (!e) {
        return {
            type: 'missing_email',
            message: 'Please fill out this field.'
        };
    }
    return {
        type: 'email_exists',
        message: 'Email Address already exist!'
    };
}