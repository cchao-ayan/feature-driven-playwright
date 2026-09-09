import { EmailValidationType } from "@playwright-shared/types/validations/email-validation.type";
import { ValidationResult } from "@playwright-shared/types/validations/validation.type";

// ======================================================================//
// ===============       Login Types and Interfaces       ===============//
// ======================================================================//

export const loginFields = [
  'email',
  'password'
] as const;

export type LoginFields = typeof loginFields[number];

export type LoginFieldsData = Partial<Record<LoginFields, string>>;
/**
 Same as:
 export interface LoginFieldsData {
  email?: string;
  password?: string;
  } 
 */

export interface InvalidLoginTestData extends LoginFieldsData {
  id: string;
  scenario: string;
  error_message: string;
  internal_type: LoginInternalType;
}


export type LoginInternalType =
  | EmailValidationType
  | 'missing_email_and_password'
  | 'missing_password'
  | 'invalid_credentials';

// Reusing the generic ValidationResult type for login validation results
export type LoginValidationResult = ValidationResult<LoginInternalType>;


// ======================================================================//
// ==========       Registered User Types and Interfaces       ==========//
// ======================================================================//

export interface Credential {
  email: string;
  password: string; 
}

export interface RegisteredUser extends Credential {
  username: string;
}