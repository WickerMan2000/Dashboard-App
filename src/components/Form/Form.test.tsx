import { fireEvent, render, waitFor } from "@testing-library/react";
import { renderWithCustomInputProvider } from "../../helpers/render.helpers";
import { mockedInputContextConfigurationData } from "../../mockData/context/context.data";
import { mockedInputUserData, mockedUserData } from "../../mockData/user/user.data";
import ApiService from "../../service/ApiService";
import { InputContextInterface } from "../../types/types";
import { Form } from "./Form";
import { feedback, fields } from "./form.data";

jest.mock('../../service/ApiService', () => ({
    modifyPerson: jest.fn()
}));

describe("Form", () => {
    it("should render the Form", () => {
        const { getByTestId, queryByTestId } = render(<Form />);
        
        const formElement = getByTestId('form');
        const nameField = getByTestId('name-field');
        const emailField = getByTestId('email-field');
        const phoneField = getByTestId('phone-field');
        const addressField = getByTestId('address-field');
        const companyField = getByTestId('company-field');
        const saveButton = getByTestId('save-btn');
        const cancelButton = queryByTestId('cancel-btn');

        expect(formElement).toBeInTheDocument();
        expect(nameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(phoneField).toBeInTheDocument();
        expect(addressField).toBeInTheDocument();
        expect(companyField).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();
        expect(cancelButton).not.toBeInTheDocument();
    });

    it('should render the Form with the given user`s data in each field', async () => {
        const { getByTestId, queryByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);

        const nameField = getByTestId('name-field');
        const emailField = getByTestId('email-field');
        const phoneField = getByTestId('phone-field');
        const addressField = getByTestId('address-field');
        const companyField = getByTestId('company-field');
        const saveButton = getByTestId('save-btn');
        const cancelButton = queryByTestId('cancel-btn');

        expect((nameField as HTMLInputElement).value).toBe('Mollie Oneill');
        expect((emailField as HTMLInputElement).value).toBe('mollie.oneill@viagrand.biz');
        expect((phoneField as HTMLInputElement).value).toBe('+1 (852) 535-3880');
        expect((addressField as HTMLInputElement).value).toBe('120 Cedar Street, Mansfield, Kentucky, 8890');
        expect((companyField as HTMLInputElement).value).toBe('VIAGRAND');
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();
        expect(cancelButton).not.toBeInTheDocument();
    });

    test.each(fields)(
        'should check the %p`s field functionality', (_, field, value) => {
            const { getByTestId, queryByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);
    
            const actualField = getByTestId(field);
            const saveButton = getByTestId('save-btn');
    
            expect(saveButton).toBeDisabled();
            expect(queryByTestId('cancel-btn')).not.toBeInTheDocument();
    
            fireEvent.change(actualField, { target: { value } });
    
            expect((actualField as HTMLInputElement).value).toBe(value);
            expect(saveButton).toBeEnabled();
            expect(getByTestId('cancel-btn')).toBeInTheDocument();
        }
    );

    test.each(feedback)(
        'should check if appropriate feedback is given when %p is not provided', (_, field, message, value, feedback) => {
            const { getByTestId, queryByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);
    
            const actualField = getByTestId(field);
            const actualFeedback = getByTestId(message);
            const saveButton = getByTestId('save-btn');
    
            expect(saveButton).toBeDisabled();
            expect(queryByTestId('cancel-btn')).toBeNull();
    
            fireEvent.change(actualField, { target: { value } });
    
            expect((actualField as HTMLInputElement).value).toBe(value);
            expect(saveButton).toBeDisabled();
            expect(actualFeedback.textContent).toBe(feedback);
            expect(getByTestId('cancel-btn')).toBeInTheDocument();
        }
    );

    it('should check if submit button is pushed, appropriate api is called', async () => {
        const typedName = 'James Dean';
        const typedPhone = '111-2222-3';

        (ApiService.modifyPerson as jest.Mock).mockImplementation(() => Promise.resolve({
            data: {
                ...mockedUserData,
                name: typedName,
                phone: typedPhone,
            }
        }));
        jest.spyOn(console, 'log');

        const { getByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);

        const nameField = getByTestId('name-field');
        const phoneField = getByTestId('phone-field');
        const saveButton = getByTestId('save-btn');

        expect(saveButton).toBeDisabled();

        fireEvent.change(nameField, { target: { value: typedName } });
        fireEvent.change(phoneField, { target: { value: typedPhone } });

        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        expect(ApiService.modifyPerson).toHaveBeenCalledWith(
            mockedUserData.id,
            {
                ...mockedInputUserData,
                name: typedName,
                phone: typedPhone,
            }
        );

        await waitFor(() => {
            expect(console.log).not.toHaveBeenCalled();
        });
    });

    it('should check if submit button is pushed, the appropriate api call fails', async () => {
        const typedName = 'James Dean';
        const typedPhone = '111-2222-3';
        const APIError = new Error('Api call failed');

        (ApiService.modifyPerson as jest.Mock).mockImplementation(() => Promise.reject(APIError));
        jest.spyOn(console, 'log');

        const { getByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);

        const nameField = getByTestId('name-field');
        const phoneField = getByTestId('phone-field');
        const saveButton = getByTestId('save-btn');

        expect(saveButton).toBeDisabled();

        fireEvent.change(nameField, { target: { value: typedName } });
        fireEvent.change(phoneField, { target: { value: typedPhone } });

        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        expect(ApiService.modifyPerson).toHaveBeenCalledWith(
            mockedUserData.id,
            {
                ...mockedInputUserData,
                name: typedName,
                phone: typedPhone,
            }
        );

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith('Api call failed');
        });
    });

    it('should check if cancel button is clicked, the form will reset, save button will be disabled and cancel button will disappear', () => {
        const typedName = 'James Dean';
        const typedPhone = '111-2222-3';

        const { getByTestId, queryByTestId } = renderWithCustomInputProvider(<Form />, mockedInputContextConfigurationData as InputContextInterface);

        const nameField = getByTestId('name-field');
        const emailField = getByTestId('email-field');
        const phoneField = getByTestId('phone-field');
        const addressField = getByTestId('address-field');
        const companyField = getByTestId('company-field');
        const saveButton = getByTestId('save-btn');

        fireEvent.change(nameField, { target: { value: typedName } });
        fireEvent.change(phoneField, { target: { value: typedPhone } });

        expect(saveButton).toBeEnabled();
        expect((nameField as HTMLInputElement).value).toBe(typedName);
        expect((emailField as HTMLInputElement).value).toBe('mollie.oneill@viagrand.biz');
        expect((phoneField as HTMLInputElement).value).toBe(typedPhone);
        expect((addressField as HTMLInputElement).value).toBe('120 Cedar Street, Mansfield, Kentucky, 8890');
        expect((companyField as HTMLInputElement).value).toBe('VIAGRAND');

        fireEvent.click(getByTestId('cancel-btn'));

        expect((nameField as HTMLInputElement).value).toBe('Mollie Oneill');
        expect((emailField as HTMLInputElement).value).toBe('mollie.oneill@viagrand.biz');
        expect((phoneField as HTMLInputElement).value).toBe('+1 (852) 535-3880');
        expect((addressField as HTMLInputElement).value).toBe('120 Cedar Street, Mansfield, Kentucky, 8890');
        expect((companyField as HTMLInputElement).value).toBe('VIAGRAND');

        expect(saveButton).toBeDisabled();
        expect(queryByTestId('cancel-btn')).not.toBeInTheDocument();
    });
});