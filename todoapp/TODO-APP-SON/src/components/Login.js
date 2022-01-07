import React, { useState } from "react";
import { Card, Button, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { auth } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import "./Components.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);

      history.push("/todo");
    } catch (err) {
      alert(
        `There is no such account found. Register or type the correct email and password`
      );
    }
  };

  return (
    <div className="center-div">
      <Card
        bg={"primary"}
        className="card-center"
        style={{ width: "24rem", height: "24rem" }}
        border="dark"
      >
        <div className="container text-center">
          <h3>Login</h3>

          <Form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="control-center"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </Form.Group>
                </Form.Group>
              </Form>
            </div>
            <div className="button-space">
              <Button type="submit" variant="info" size="lg" block="true">
                Login
              </Button>
            </div>

            <div className="button-space2">
              <Link to="/register">
                <Button variant="dark" size="lg" block="true">
                  Register
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
