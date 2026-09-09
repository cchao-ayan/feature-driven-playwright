// MODEL 
export interface Product {
  id: string | null;
  name: string;
  price: string;
}
// clear distinction between the product card and product details, as the card only has the basic info, while the details have more info about the product
export interface ProductCard extends Product {}

export interface ProductDetails extends Product {
  brand: string;
  usertype: string;
  category: string;
}

// DTO 
// This model represents the structure of the product data returned by the API, which may have a different structure than the one used in the UI models.
// The normalizeProductData function is used to convert the API response into the format used by the UI models.
export interface ProductApi {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: {
      usertype: string;
    };
    category: string;
  };
}

// MAPPER 
// This function takes the product data returned by the API and converts it into the format used by the UI models.
// It handles any necessary transformations, such as converting the id to a string and providing default values for missing fields.
export function normalizeProductData(api: ProductApi): ProductDetails {
  return {
    id: api.id ? String(api.id) : null,
    name: api.name ?? '',
    price: api.price ?? '',
    brand: api.brand ?? '',
    usertype: api.category?.usertype?.usertype ?? '',
    category: api.category?.category ?? '',
  };
}
