import { getFirstSpecialCharacterAfterAt } from "@playwright-shared/utils/data/data-helper";
import { EmailValidationType } from "@playwright-shared/types/validations/email-validation.type";

export function validateEmailFormat(email: string): { type: EmailValidationType, message: string } | undefined {
    if (!email) {
        return {
            type: 'missing_email',
            message: 'Please fill out this field.'
        };
    }

    if (!email.includes('@')) {
        return {
            type: 'missing_at',
            message: `Please include an '@' in the email address. '${email}' is missing an '@'.`
        };
    }
    if (email.startsWith('@')) {
        return {
            type: 'missing_before_at',
            message: `Please enter a part followed by '@'. '${email}' is incomplete.`
        };
    }
    if (email.endsWith('@')) {
        return {
            type: 'missing_after_at',
            message: `Please enter a part following '@'. '${email}' is incomplete.`
        };
    }
    const invalidDomainChar = getFirstSpecialCharacterAfterAt(email);
    if (invalidDomainChar) {
        return {
            type: 'invalid_domain_char',
            message: `A part following '@' should not contain the symbol '${invalidDomainChar}'.`
        };
    }

    return undefined; // Email format is valid
}