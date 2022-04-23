import Axios from 'axios';

const Instance = Axios.create({
	baseURL: 'https://bract.herokuapp.com/'
});

export default Instance;

//main api
//	baseURL: 'https://bract.herokuapp.com/'
