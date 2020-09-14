import axios from "axios";

const express = require("express");
const router = express.Router();
const BASEURL = "https://trefle.io/api/v1/plants/";
const APIKEY = "token=4X3cnkrtJQkr43W5E8MqVHBljQjceJ3RwXG2sDcVelg";

router.get("/api/search", function(query, res){
    console.log("hit plant search api");
    return axios.get(BASEURL + "search?" + APIKEY + "&q=" + query);
});


// export default {
//   search: function(query) {
    
//   },

//   bydefault: function(id){
//     return axios.get(BASEURL + id + "?" + APIKEY)
//   },
// };

module.exports = router;
