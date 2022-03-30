import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import firebaseAuth from "../config/firebaeAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onLoginClick = () => {
    const { email, password } = credentials;
    signInWithEmailAndPassword(firebaseAuth, email, password)
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
      <h5>Login</h5>
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
        <Button onClick={onLoginClick}>Login</Button>
      </Form>
    </>
  );
}

export default Login;
