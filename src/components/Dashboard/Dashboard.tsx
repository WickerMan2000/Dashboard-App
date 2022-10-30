import { Form } from "../Form/Form";
import { Persons } from "../Persons/Persons";
import { Container } from "./styles";

export const Dashboard = () => {
  return (
    <Container data-testid="dashboard">
      <Persons />
      <Form />
    </Container>
  );
}
