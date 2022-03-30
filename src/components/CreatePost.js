import { useState } from "react";
import { Form, Label, FormGroup, Button, Input } from "reactstrap";
import { addDoc, collection } from "firebase/firestore";
import firebaseDb from "../config/firebaseDb";

function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const onValueChange = (event, label) => {
    const value = event.target.value;
    setPost((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  const onCreateClick = async () => {
    const docRef = await addDoc(collection(firebaseDb, "posts"), post);
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div>
      <h5>Create Post</h5>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input onChange={(event) => onValueChange(event, "title")} />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input onChange={(event) => onValueChange(event, "description")} />
        </FormGroup>
        <Button onClick={onCreateClick}>Create</Button>
      </Form>
    </div>
  );
}

export default CreatePost;
