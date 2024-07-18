import { productArray } from './RawDataSet';
import { Product } from "./ProductDefinition";

export interface ProductDataReturnType {
    categories: string[];
    categoryToProducts: { [category: string]: Product[] };
}

export const ProductData = (): ProductDataReturnType => {

    const categorySet = new Set<string>();
    const categoryToProducts: { [category: string]: Product[] } = {};

    categoryToProducts["All"] = productArray;

    productArray.forEach(product => {
        const category = product.category;
        if (categoryToProducts[category]) {
            categoryToProducts[category].push(product);
        } else {
            categoryToProducts[category] = [product];
        }

        if (!categorySet.has(category)) {
            categorySet.add(category);
        }
    });

    const categories = ["All", ...Array.from(categorySet)];
    console.log("Total categories ", categories.length);
    console.log("Total products ", categoryToProducts["All"].length);

    const productDataReturnType: ProductDataReturnType = { categories, categoryToProducts };
    return productDataReturnType;
};
