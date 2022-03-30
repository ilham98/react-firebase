import { useEffect, useState } from "react";
import { Form, Label, FormGroup, Button, Input } from "reactstrap";
import { setDoc, collection, doc } from "firebase/firestore";
import firebaseDb from "../config/firebaseDb";

function UpdatePost(props) {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    console.log(props.selectedPost);
    setPost(props.selectedPost);
  }, [props.selectedPost]);

  const onValueChange = (event, label) => {
    const value = event.target.value;
    setPost((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  const onUpdateClick = async () => {
    const docRef = await setDoc(
      doc(firebaseDb, "posts", props.selectedPost.id),
      post
    );
    props.setIsOpen(false);
  };

  return (
    <div>
      <h5>Update Post</h5>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input
            value={post.title}
            onChange={(event) => onValueChange(event, "title")}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input
            value={post.description}
            onChange={(event) => onValueChange(event, "description")}
          />
        </FormGroup>
        <Button onClick={onUpdateClick}>Update</Button>
      </Form>
    </div>
  );
}

export default UpdatePost;
