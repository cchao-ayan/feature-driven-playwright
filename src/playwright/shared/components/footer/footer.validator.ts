import { validateEmailFormat } from '@playwright-shared/types/validators/email.validator';
import { FooterFieldData, FooterValidationResult } from '@playwright-shared/components/footer/footer.type';

export function validateFooterInput(data: FooterFieldData): FooterValidationResult {
    const e = data.email ?? '';
    const emailValidation = validateEmailFormat(e);
    if (emailValidation) {
        return emailValidation;
    }
    return {
        type: 'valid_email',
        message: 'Email Address is valid!'
    };
}