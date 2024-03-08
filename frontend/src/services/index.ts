import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.params = {};
import AuthService from "./AuthService"
import PostService from "./PostService"
export {AuthService, PostService};
