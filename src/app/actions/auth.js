import config from "../../config";
import axios from "axios";

const authenticate = () => {
    const {
        SERVER
    } = config
    return axios.get(`${SERVER}/oauth/authenticate`)
        .then(response => {
            return response.data
        })
}

const exportFunctions = {

}
export default exportFunctions