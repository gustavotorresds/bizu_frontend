import axios from 'axios';

const PROD_DOMAIN = "http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com";
const DEV_DOMAIN = "http://127.0.0.1:8000";

const requester = axios.create({
  baseURL: PROD_DOMAIN
});

const token = localStorage.getItem('token');
if (token) {
	console.log('SETTIN');
	requester.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export default requester;