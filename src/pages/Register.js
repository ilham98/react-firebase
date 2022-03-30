import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../config/firebaeAuth";

function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onRegisterClick = () => {
    const { email, password } = credentials;
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const onValueChange = (event, label) => {
    const value = event.target.value;
    setCredentials((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  return (
    <>
      <h5>Register</h5>
      <Form>
        <FormGroup>
          <Label>Email</Label>
          <Input onChange={(event) => onValueChange(event, "email")} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            onChange={(event) => onValueChange(event, "password")}
            type="password"
          />
        </FormGroup>
        <Button onClick={onRegisterClick}>Register</Button>
      </Form>
    </>
  );
}

export default Register;
