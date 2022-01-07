import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "./Components.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return alert(`Passwords are not same`);
    }

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      alert(`Account created with an email:${result.user.email}`);
      history.push("/");
    } catch (err) {
      alert(`Register failed. Some parts are missing`);
    }
  };

  return (
    <div className="center-div">
      <Card
        bg={"secondary"}
        className="card-center"
        style={{ width: "24rem", height: "24rem" }}
        border="dark"
      >
        <div className=" container text-center ">
          <h3 className="container text-center">Register</h3>

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="control-center"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Group>
            </Form.Group>
            <p></p>
            <Button type="submit" variant="dark" size="lg" block="true">
              Register
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
}
