import { APIRequestContext, Response, expect } from '@playwright/test';
import { Logger } from '@playwright-shared/utils/logger/logger';

export class PaymentAPI {
  constructor(protected readonly request: APIRequestContext) { }

  public async paymentAPIValidation(responsePromise: Promise<Response>) {
    const response = await responsePromise;
    // Log everything so you can see the actual shape
    //console.log('Status:', response.status());
    //console.log('Status Text:', response.statusText());
    //console.log('Headers:', response.headers());
    expect(response.status()).toBe(302);
  }
}
