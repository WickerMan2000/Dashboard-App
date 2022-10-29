import styled from "styled-components";
import { Form } from "../Form/Form";
import { Persons } from "../Persons/Persons";

const Container = styled.div`
  display: flex;
  margin: 70px auto;
  width: 50%;
  position: relative;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
`;

export const Dashboard = () => {
  return (
    <Container data-testid="dashboard">
      <Persons />
      <Form />
    </Container>
  );
}
