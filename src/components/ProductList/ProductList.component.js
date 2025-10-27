import {
    ProductList,
    ProductList__Items,
    ProductList__Wrapper
} from './ProductList.module.scss';

import ProductCartComponent from '@/components/ProductCart';
import { fetchAPI } from '@/utils/api';

export default async function ProductListComponent() {
    const loadProduct = async () => {
        let params = {
            populate: {
                image: true,
                category: true
            },
            filters: {
                category: {
                    name: {
                        $eq: 'coin'
                    }
                }
            },
            pagination: {
                page: 1,
                pageSize: 6
            }
        };

        const response = await fetchAPI('/products', params);

        return response.data;
    };

    const products = await loadProduct();

    return (
        <div className={ ProductList__Wrapper } id="pricing">
            <div className={ ProductList }>
                <h2>Pricing</h2>
                <div className={ ProductList__Items }>
                    {
                        products.map((product, index) => (
                            <ProductCartComponent productData={ product } key={ index } />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
