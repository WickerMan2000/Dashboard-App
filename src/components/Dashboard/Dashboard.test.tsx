import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithAllCustomProviders, renderWithAllProviders } from '../../helpers/render.helpers';
import { mockedEnablerContextConfigurationData } from '../../mockData/context/context.data';
import { mockedAnotherUserData, mockedUserData, mockedUsersList } from '../../mockData/user/user.data';
import ApiService from '../../service/ApiService';
import { Dashboard } from './Dashboard';

jest.mock('../../service/ApiService', () => ({
    getAllPersons: jest.fn(),
    getPerson: jest.fn(),
    modifyPerson: jest.fn()
}));

describe('Dashboard', () => {
    beforeEach(() => {
        (ApiService.getAllPersons as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUsersList
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should check if the users list is updated when user`s data is edited', async () => {
        const typedName = 'Steve Harris';
        const typedEmail = 'steveharris@gmail.com';
        const typedPhone = '333-555-1212';

        (ApiService.modifyPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: {
                data: {
                    ...mockedUserData,
                    name: typedName,
                    email: typedEmail,
                    phone: typedPhone,
                }
            }
        }));

        const { getByTestId, findAllByTestId } = renderWithAllCustomProviders(<Dashboard />, mockedEnablerContextConfigurationData);

        const persons = await findAllByTestId(/person/i);
        const nameField = getByTestId('name-field');
        const emailField = getByTestId('email-field');
        const phoneField = getByTestId('phone-field');
        const saveButton = getByTestId('save-btn');

        fireEvent.change(nameField, { target: { value: typedName } });
        fireEvent.change(emailField, { target: { value: typedEmail } });
        fireEvent.change(phoneField, { target: { value: typedPhone } });
        fireEvent.click(saveButton);

        const spinner = getByTestId('circular-spinner');

        expect(spinner).toBeInTheDocument();

        await waitFor(() => {
            expect(spinner).not.toBeInTheDocument();
            expect(persons[1].textContent).toMatch(/Steve Harris/);
            expect(persons[1].textContent).toMatch(/steveharris@gmail.com/);
        });
    });

    it('should check if a user is clicked, their data populate the form`s fields', async () => {
        (ApiService.getPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUserData
        }));

        const { getByTestId, findAllByTestId } = renderWithAllCustomProviders(<Dashboard />, mockedEnablerContextConfigurationData);

        const persons = await findAllByTestId(/person/i);
        const nameField = getByTestId('name-field');
        const emailField = getByTestId('email-field');
        const phoneField = getByTestId('phone-field');
        const addressField = getByTestId('address-field');
        const companyField = getByTestId('company-field');
        
        fireEvent.click(persons[1]);
        
        const spinner = getByTestId('circular-spinner');

        expect(spinner).toBeInTheDocument();
        
        await waitFor(async () => {
            expect(spinner).not.toBeInTheDocument();
            expect((nameField as HTMLInputElement).value).toBe('Mollie Oneill');
            expect((emailField as HTMLInputElement).value).toBe('mollie.oneill@viagrand.biz');
            expect((phoneField as HTMLInputElement).value).toBe('+1 (852) 535-3880');
            expect((addressField as HTMLInputElement).value).toBe('120 Cedar Street, Mansfield, Kentucky, 8890');
            expect((companyField as HTMLInputElement).value).toBe('VIAGRAND');
            expect(ApiService.getPerson).toHaveBeenCalledTimes(1);
            expect(ApiService.getPerson).toHaveBeenCalledWith(mockedUserData.id);
            expect(await (ApiService.getPerson as jest.Mock).mock.results[0].value).toEqual({
                data: mockedUserData
            });
        });
    });

    it('should check if another user is clicked, the previous user`s feedback messages have been removed', async () => {
        (ApiService.getPerson as jest.Mock).mockImplementationOnce(() => Promise.resolve({
            data: mockedUserData
        })).mockImplementationOnce(() => Promise.resolve({
            data: mockedAnotherUserData
        }));

        const { getByTestId, findAllByTestId } = renderWithAllCustomProviders(<Dashboard />, mockedEnablerContextConfigurationData);

        const persons = await findAllByTestId(/person/i);
        const emailField = getByTestId('email-field');
        const emailFeedback = getByTestId('email-msg');

        fireEvent.click(persons[1]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        fireEvent.change(emailField, { target: { value: 'invalid email' } });

        expect(emailFeedback.textContent).toBe('Email has an invalid format');

        fireEvent.click(persons[3]);

        await waitFor(async () => {
            expect(emailFeedback.textContent).toBe('');
            expect(ApiService.getPerson).toHaveBeenCalledTimes(2);
            expect((ApiService.getPerson as jest.Mock).mock.calls[0][0]).toBe(mockedUserData.id);
            expect((ApiService.getPerson as jest.Mock).mock.calls[1][0]).toBe(mockedAnotherUserData.id);
            expect(await (ApiService.getPerson as jest.Mock).mock.results[0].value).toEqual({
                data: mockedUserData
            });
            expect(await (ApiService.getPerson as jest.Mock).mock.results[1].value).toEqual({
                data: mockedAnotherUserData
            });
        });
    });

    it('should check if a user is clicked, the form will show up', async () => {
        (ApiService.getPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUserData
        }));

        const { getByTestId, queryByTestId, findAllByTestId } = renderWithAllProviders(<Dashboard />);

        const persons = await findAllByTestId(/person/i);
        const message = getByTestId('message');

        expect(message).toBeInTheDocument();
        expect(queryByTestId('form')).toBeNull();

        fireEvent.click(persons[1]);

        expect(getByTestId('form')).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
        expect(ApiService.getPerson).toHaveBeenCalledTimes(1);
        expect(ApiService.getPerson).toHaveBeenCalledWith(mockedUserData.id);
        expect(await (ApiService.getPerson as jest.Mock).mock.results[0].value).toEqual({
            data: mockedUserData
        });
    });

    it('should check if user`s data have been edited, the form should be replaced by a message', async () => {
        const typedEmail = 'johndoe@gmail.com';
        (ApiService.getPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: mockedUserData
        }));
        (ApiService.modifyPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: {
                data: {
                    ...mockedUserData,
                    email: typedEmail,
                }
            }
        }));

        const { getByTestId, queryByTestId, findAllByTestId } = renderWithAllProviders(<Dashboard />);

        const persons = await findAllByTestId(/person/i);

        expect(getByTestId('message')).toBeInTheDocument();

        fireEvent.click(persons[1]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(queryByTestId('message')).not.toBeInTheDocument();

        const emailField = getByTestId('email-field');
        const saveButton = getByTestId('save-btn');

        fireEvent.change(emailField, { target: { value: typedEmail } });
        fireEvent.click(saveButton);

        const form = queryByTestId('form');

        await waitFor(async () => {
            expect(form).not.toBeInTheDocument();
            expect(getByTestId('message')).toBeInTheDocument();
            expect(ApiService.getPerson).toHaveBeenCalledWith(mockedUserData.id);
            expect(await (ApiService.getPerson as jest.Mock).mock.results[0].value).toEqual({
                data: mockedUserData
            });
        });
    });
});