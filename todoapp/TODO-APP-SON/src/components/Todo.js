import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Components.css";

let unsubscribe = () => {};

export default function Todo({ user }) {
  const [text, setText] = useState("");
  const [mytodos, setTodos] = useState([]);
  const [email, setEmail] = useState("");
  const [connectodos, setConnecttodos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      const doc = db.collection("todos").doc(user.uid);
      unsubscribe = doc.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          setTodos(docSnap.data().todos);
        }
      });
    } else {
      history.push("/login");
    }
    return () => {
      unsubscribe();
    };
  }, []);

  function handleConnect(mail) {
    user.uid = user.mail.uid;
  }
  const addTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        todos: [...mytodos, text],
      });
  };

  const deleteTodo = (deleteTodo) => {
    const doc = db.collection("todos").doc(user.uid);
    doc.get().then((docSnap) => {
      const result = docSnap.data().todos.filter((todo) => todo !== deleteTodo);
      doc.update({
        todos: result,
      });
    });
  };
  const resetInput = (e) => {
    e.target.value = "";
  };
  /*<div>
          <Form onSubmit={(e) => handleConnect()}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                {" "}
                To connect your todo list with another account enter email{" "}
              </Form.Label>
              <Form.Control
                className="control-center"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <ListGroup>
              <ListGroupItem>
                <Button type="submit" variant="success" size="lg" block="true">
                  Connect
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Form>
        </div>*/
  return (
    <>
      <div className="container">
        <div className="addtodowithdescription">
          <div className="form-floating mb-3 mt-5">
            <Form>
              <Form.Control
                className="form-control text-align-center"
                type="text"
                placeholder="Add Task"
                onFocus={(e) => resetInput(e)}
                onChange={(e) => setText(e.target.value)}
              ></Form.Control>
            </Form>
          </div>
          <Button
            className="button-right-space"
            type="submit"
            variant="secondary"
            size="lg"
            onClick={() => {
              addTodo();
            }}
          >
            Create Task
          </Button>
          <Button
            className="button-left-space"
            variant="danger"
            size="lg"
            onClick={() => {
              auth.signOut();
              history.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="task-container">
        {mytodos.map((todo, index) => {
          return (
            <>
              <div
                class="card-wrapper mr-5"
                style={{ width: "14rem", height: "12rem" }}
              >
                <div class="card-top" style={{ "background-color": "gray" }}>
                  TASK TO DO
                </div>
                <div class="task-holder">
                  <p>{todo}</p>

                  <div>
                    <Button
                      variant="secondary"
                      style={{
                        position: "absolute",
                        right: "1px",
                        bottom: "1px",
                      }}
                      onClick={() => {
                        deleteTodo(todo);
                      }}
                    >
                      Delete Task
                    </Button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
