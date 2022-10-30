import { Container, FormContainer } from './styles';
import { Persons } from '../Persons/Persons';
import { Form } from '../Form/Form';
import EnablerContext from '../../store/EnablerContextProvider';
import { useContext } from 'react';
import { EnablerContextInterface } from '../../types/types';
import { Message } from '../Message/Message';

export const Dashboard = () => {
  const { formEnabled } = useContext<EnablerContextInterface>(EnablerContext);

  return (
    <Container data-testid="dashboard">
      <Persons />
      <FormContainer>
        {formEnabled ? <Form /> : < Message/>}
      </FormContainer>
    </Container>
  );
}
