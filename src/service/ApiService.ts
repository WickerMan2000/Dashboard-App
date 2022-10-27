import axios from "axios";
import { API } from "./constants";

export default class ApiService {
  static async getAllPersons() {
    return await axios.get(API);
  }

  static async getPerson(id: any) {
    return await axios.get(`${API}/${id}`);
  }

  static async modifyPerson(id: any, data: any) {
    return await axios.put(`${API}/${id}`, { data });
  }
}
