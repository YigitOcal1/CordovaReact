import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./Components.css";

export default function Home() {
  return (
    <div className="center-div">
      <Card
        bg={"info"}
        className="card-center"
        border="dark"
        style={{ width: "24rem", height: "24rem" }}
      >
        <h3 className="container text-center">TODO APP</h3>
        <Link to="/login">
          <Button className="button" variant="dark" size="lg" block="true">
            Login
          </Button>
        </Link>
        <p></p>
        <Link to="/register">
          <Button className="button" variant="dark" size="lg" block="true">
            Register
          </Button>
        </Link>
      </Card>
    </div>
  );
}
