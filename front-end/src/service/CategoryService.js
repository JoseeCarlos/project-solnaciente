import axios from 'axios';

export class CategoryService {

    getCategories() {
        return axios.get('assets/demo/data/categories.json').then(res => res.data.data);
    }
}