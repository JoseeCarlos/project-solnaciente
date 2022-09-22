import axios from 'axios';

export class ProductService {

    //create variable url
    
    
    
    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }

    

    getProductsWhitApi() {
        //mode no cors
        return fetch("/api/products/").then((res)=>res.json().then((data)=>data));
    }
}