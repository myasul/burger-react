import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-b2062.firebaseio.com/'
});

export default instance;