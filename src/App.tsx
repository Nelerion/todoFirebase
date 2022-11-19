import React from "react";
import styled from "styled-components";
import "./App.css";
import Todo from "./components/todo/todo";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Todo />
    </Container>
  );
};

export default App;
