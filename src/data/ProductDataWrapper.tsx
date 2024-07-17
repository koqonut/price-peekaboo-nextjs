import { PRODUCTS, Product } from './dataset';


const ProductData = () => {

    const categorySet = new Set();
    const categoryToProducts: { [category: string]: Product[] } = {};

    categoryToProducts["All"] = PRODUCTS;

    PRODUCTS.forEach(product => {
        var category = product.category;
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

    return { categories, categoryToProducts };

};

export default ProductData;