import { fireEvent, render } from '@testing-library/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { defaultFeedback, useFeedback } from './useFeedback';

const initialValues = { id: "", name: "", email: "", phone: "",   address: "", company: "" };

const CustomForm = () => {
    const [values, setValues] = useState(initialValues);
    const [unmount, setUnmount] = useState(false);
    const { feedback, setFeedback, validator } = useFeedback();

    useEffect(() => {
        return () => setFeedback(defaultFeedback);
    }, [unmount]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    const handleClick = () => setUnmount(true);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validator(values);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" value={values.name} onChange={handleChange} data-testid="name" />
                <p data-testid="name-msg">{feedback.nameMessage}</p>
                <input name="email" type="text" value={values.email} onChange={handleChange} data-testid="email" />
                <p data-testid="email-msg">{feedback.emailMessage}</p>
                <input name="phone" type="text" value={values.phone} onChange={handleChange} data-testid="phone" />
                <p data-testid="phone-msg">{feedback.phoneMessage}</p>
                <button type="submit" data-testid="submit-btn">Submit</button>
                <button type="button" data-testid="unmount-btn" onClick={handleClick}>Unmount</button>
            </form>
        </div>
    );
};

describe('useFeedback', () => {
    it('should check if the validator gives the right message on submission', () => {
        const { getByTestId } = render(<CustomForm />);

        const nameInput = getByTestId('name');
        const nameMessage = getByTestId('name-msg');
        const emailInput = getByTestId('email');
        const emailMessage = getByTestId('email-msg');
        const button = getByTestId('submit-btn');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'invalid email' } });
        fireEvent.click(button);

        expect(nameMessage.textContent).toBe('');
        expect(emailMessage.textContent).toBe('Email has an invalid format');
    });

    it('should check if Form unmounts, the feedback messages have been cleaned up', () => {
        const { getByTestId } = render(<CustomForm />);

        const nameInput = getByTestId('name');
        const nameMessage = getByTestId('name-msg');
        const sumbitBtn = getByTestId('submit-btn');
        const unmountBtn = getByTestId('unmount-btn');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.click(sumbitBtn);

        expect(nameMessage.textContent).toBe('Name is required');

        fireEvent.click(unmountBtn);

        expect(nameMessage.textContent).toBe('');
    });
});