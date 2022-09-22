import axios from 'axios';

export class UserService {

    getUsers() {
        return axios.get('assets/demo/data/users.json').then(res => res.data.data);
    }
}