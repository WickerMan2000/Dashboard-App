import axios from "axios";
import { PersonInterface } from "../types/types";
import { API } from "./constant";

export default class ApiService {
  static async getAllPersons() {
    return await axios.get(API);
  }

  static async getPerson(id: string) {
    return await axios.get(`${API}/${id}`);
  }

  static async modifyPerson(id: string, data: PersonInterface) {
    return await axios.put(`${API}/${id}`, { data });
  }
}
