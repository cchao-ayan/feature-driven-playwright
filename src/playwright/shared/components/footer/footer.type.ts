import { EmailValidationType } from "@playwright-shared/types/validations/email-validation.type";
import { ValidationResult } from "@playwright-shared/types/validations/validation.type";

export interface InvalidFooterEmailTestData {
    id: string;
    scenario: string;
    email?: string;
    error_message: string;
    internal_type: EmailValidationType;
}

export interface FooterFieldData {
    email?: string;
}

export type FooterFields =
    | 'email';

export type FooterValidationTypes =
    | EmailValidationType 
    | 'valid_email';

export type FooterValidationResult = ValidationResult<FooterValidationTypes>;