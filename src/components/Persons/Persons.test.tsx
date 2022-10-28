import { waitFor } from "@testing-library/react";
import { renderWithLoadingProvider } from "../../helpers/render.helpers";
import { mockedUsersList } from "../../mockData/user/user.data";
import ApiService from "../../service/ApiService";
import { Persons } from "./Persons";

jest.mock('../../service/ApiService', () => ({
    getAllPersons: jest.fn()
}));

describe("Persons", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the list of all users", async () => {
        (ApiService.getAllPersons as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUsersList
        }));

        const { getByTestId, findAllByTestId } = renderWithLoadingProvider(<Persons />);
        const spinner = getByTestId('circular-spinner');

        expect(spinner).toBeInTheDocument();

        const persons = await findAllByTestId('person');

        expect(ApiService.getAllPersons).toHaveBeenCalledTimes(1);
        expect(persons.length).toBe(5);
        expect(spinner).not.toBeInTheDocument();
    });

    it('should fail to render the list of all users', async () => {
        const APIError = new Error('Api call failed');

        (ApiService.getAllPersons as jest.Mock).mockImplementation(() => Promise.reject(APIError));
        jest.spyOn(console, 'log');

        const { getByTestId, queryAllByTestId } = renderWithLoadingProvider(<Persons />);
        const spinner = getByTestId('circular-spinner');
        const persons = queryAllByTestId('person');

        expect(spinner).toBeInTheDocument();
        expect(persons.length).toBe(0);
        expect(ApiService.getAllPersons).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(spinner).not.toBeInTheDocument();
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith('Api call failed');
        });
    });
});