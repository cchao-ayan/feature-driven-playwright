import { APIRequestContext } from '@playwright/test';
import { ProductApi } from '../types/product.type';
import { Logger } from '@playwright-shared/utils/logger/logger';

export class ProductAPI {
  constructor(protected readonly request: APIRequestContext) {}

  public async getAllProducts(): Promise<ProductApi[]> {
    const response = await this.request.get('/api/productsList');
    const responseBody = await response.json();
    Logger.info(`API Response: ${JSON.stringify(responseBody.products, null, 2)}`);
    return responseBody.products;
  }
}
