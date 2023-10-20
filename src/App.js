import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { ShimmerText } from "react-shimmer-effects";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/"
        );

        setTodos(response.data);

        setTimeout(() => {
          setIsLoading(false); // Set isLoading to false after data is fetched
        }, 1000);
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Handle error and set isLoading to false
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          {todos.map((todo) => (
            <Col className="border p-3 col-md-4" key={todo.id}>
              {isLoading ? (
                <div className="w-100">
                  <ShimmerText line={2} gap={10} />
                </div>
              ) : (
                <>
                  <h4>{todo.title}</h4>
                  <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                </>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
