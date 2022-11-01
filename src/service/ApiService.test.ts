import ApiService from './ApiService';
import axios from "axios";
import { API } from "./constant";
import { mockedUserData } from '../mockData/user/user.data';

jest.mock('axios');

describe('ApiService', () => {
    it('should check if getAllPersons calls axios in a right way', async () => {
        await ApiService.getAllPersons();

        expect(axios.get).toHaveBeenCalledWith(API);
    });

    
    it('should check if getPerson calls axios with user id', async () => {
        await ApiService.getPerson(mockedUserData.id);

        expect(axios.get).toHaveBeenCalledWith(`${API}/${mockedUserData.id}`);
    });

    it('should check if modifyPerson calls axios with user id and data', async () => {
        await ApiService.modifyPerson(mockedUserData.id, mockedUserData);

        expect(axios.put).toHaveBeenCalledWith(`${API}/${mockedUserData.id}`, { data: mockedUserData });
    });
});