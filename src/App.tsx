import styled from "styled-components";
import { Persons } from "./components/Persons/Persons";
import { Form } from "./components/Form/Form";

const Container = styled.div`
  display: flex;
  margin: 50px auto;
  width: 50%;
  position: relative;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
`;

function App() {
  return (
    <Container className="App" data-testid="main-app">
      <Persons />
      <Form />
    </Container>
  );
}

export default App;
