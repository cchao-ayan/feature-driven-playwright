import { ProductAPI } from "@playwright-features/products/api/product.api";
import { PaymentAPI } from "@playwright-features/checkout/api/payment.api";
import { APIRequestContext } from "@playwright/test";

export class APIManager {
    constructor(private readonly request: APIRequestContext) { }

    private _product?: ProductAPI;
    private _payment?: PaymentAPI;

    public get product(): ProductAPI {
        return (this._product ??= new ProductAPI(this.request));
    }
    public get payment(): PaymentAPI {
        return (this._payment ??= new PaymentAPI(this.request));
    }

}