import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodoLocal,
  selectIsLoading,
  selectTodos,
} from "./features/todoSlice";
import { ShimmerText } from "react-shimmer-effects";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  const handleDelete = (todoId: number) => {
    dispatch(deleteTodoLocal(todoId) as any);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          {todos.map((todo) => (
            <Col className="border p-3 col-md-4" key={todo.id}>
              {isLoading ? (
                <div>
                  <ShimmerText line={2} gap={10} />
                </div>
              ) : (
                <>
                  <h4>{todo.myTitle}</h4>
                  <p>Completed: {todo.myCompleted ? "Yes" : "No"}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
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
