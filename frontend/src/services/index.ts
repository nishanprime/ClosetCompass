import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.params = {};
import AuthService from "./AuthService";
import FileService from "./FileService";
import ClothService from "./ClothService";
import PostService from "./PostService";
export { AuthService, FileService, ClothService, PostService };
