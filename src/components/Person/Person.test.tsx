import { fireEvent, render, waitFor } from "@testing-library/react";
import { mockedUserData } from "../../mockData/user/user.data";
import ApiService from "../../service/ApiService";
import { Person } from "./Person";

jest.mock('../../service/ApiService', () => ({
    getPerson: jest.fn()
}));

describe("Person", () => {
    it("should check if api is called when the user is clicked", () => {
        (ApiService.getPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUserData
        }));

        const { getByTestId} = render(<Person { ...mockedUserData } />);
        const person = getByTestId('person');

        fireEvent.click(person);

        expect(ApiService.getPerson).toHaveBeenCalledWith(mockedUserData.id);
    })

    it("should check if api fails when the user is clicked", async () => {
        const APIError = new Error('Api call failed');

        (ApiService.getPerson as jest.Mock).mockImplementation(() => Promise.reject(APIError));
        jest.spyOn(console, 'log');

        const { getByTestId} = render(<Person { ...mockedUserData } />);
        const person = getByTestId('person');

        fireEvent.click(person);

        expect(ApiService.getPerson).toHaveBeenCalledWith(mockedUserData.id);

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith('Api call failed');
        });
    })
});