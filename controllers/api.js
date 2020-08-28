import axios from "axios";

const BASEURL = "'https://trefle.io/api/v1/plants/";
const APIKEY = "token=4X3cnkrtJQkr43W5E8MqVHBljQjceJ3RwXG2sDcVelg";

export default {
  search: function(query) {
    return axios.get(BASEURL + "search?" + APIKEY + "&q=" + query);
  },

  bydefault: function(id){
    return axios.get(BASEURL + id + "?" + APIKEY)
  }
};
