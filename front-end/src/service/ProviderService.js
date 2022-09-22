import axios from 'axios';

export class ProviderService {

    getProvidersSmall() {
        return axios.get('assets/demo/data/providers-small.json').then(res => res.data.data);
    }

    getProviders() {
        return axios.get('assets/demo/data/providers.json').then(res => res.data.data);
    }

    getProvidersWithOrdersSmall() {
        return axios.get('assets/demo/data/providers-orders-small.json').then(res => res.data.data);
    }
}