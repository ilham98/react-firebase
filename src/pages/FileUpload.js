import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import firebaseStorage from "../config/firebaseStorage";
import {
  ref,
  uploadBytes,
  listAll,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import Swal from "sweetalert2";

function getRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function FileUpload() {
  const file = useRef();
  const [files, setFiles] = useState([]);

  const onUploadClick = () => {
    const currentFile = file.current.files[0];
    const { name } = currentFile;
    const fileName = `${getRandomString(5)}-${name}`;
    // Create a reference to 'mountains.jpg'
    const storageRef = ref(firebaseStorage, fileName);
    uploadBytes(storageRef, currentFile).then((snapshot) => {
      Swal.fire("Success", "File berhasil diupload", "success");
      fetchFiles();
    });
  };

  const fetchFiles = () => {
    // Create a reference under which you want to list
    const listRef = ref(firebaseStorage, "/");
    const newFiles = [];
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          newFiles.push(itemRef.name);
        });
        setFiles(newFiles);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const onDeleteClick = (file) => {
    // Create a reference to the file to delete
    const desertRef = ref(firebaseStorage, file);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        Swal.fire("Success", "File berhasil dihapus", "success");
        fetchFiles();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const onDownloadClick = (file) => {
    getDownloadURL(ref(firebaseStorage, file))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `test.pdf`);
        link.click();
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file}>
            {file}{" "}
            <Button color="primary" onClick={() => onDownloadClick(file)}>
              Download
            </Button>
            <Button color="danger" onClick={() => onDeleteClick(file)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <input ref={file} type="file" />
      <Button onClick={onUploadClick}>Upload</Button>
    </div>
  );
}

export default FileUpload;
