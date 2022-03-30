import { useEffect } from "react";
import firebaseDb from "../config/firebaseDb";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import CreatePost from "../components/CreatePost";
import UpdatePost from "../components/UpdatePost";
import { onSnapshot } from "firebase/firestore";
import { Button, ModalBody, ModalFooter, ModalHeader, Modal } from "reactstrap";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firebaseDb, "posts"),
      (querySnapshot) => {
        // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          newPosts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPosts(newPosts);
      }
    );
  }, []);

  const onDeleteClick = async (uid) => {
    await deleteDoc(doc(firebaseDb, "posts", uid));
  };

  const onUpdateClick = async (post) => {
    setIsOpen(true);
    setSelectedPost(post);
  };
  const modalToggle = () => {};

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <UpdatePost setIsOpen={setIsOpen} selectedPost={selectedPost} />
        </ModalBody>
      </Modal>
      <CreatePost />
      {posts.map((post) => {
        return (
          <div className="mb-2" key={post.id}>
            <div>
              <b>{post.title}</b>
            </div>
            <div>{post.description}</div>
            <Button onClick={() => onUpdateClick(post)}>Update</Button>
            <Button color="danger" onClick={() => onDeleteClick(post.id)}>
              Hapus
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
