import axios from "axios";

const url = 'http://localhost:8000';

export const getResult = async (data) => {
    try {
        const response = await axios.post(`${url}/runMatlab`,data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while calling getResult API ', error);
    }
}