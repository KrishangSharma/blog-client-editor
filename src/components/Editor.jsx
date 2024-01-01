import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  // React Quill Modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  // API Key
  const secret = import.meta.env.VITE_APP_API_SECRET;
  const serverURL = import.meta.env.VITE_APP_SERVER_URL;

  // States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      updatedImages.push(image);
    }

    // Update the state
    setImages(updatedImages);
  };

  // Handle data upload and request
  const submitData = async () => {
    setLoading(true);
    try {
      // Construct FormData
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      images.forEach((image) => {
        data.append("images", image);
      });

      //   Construct the request
      const response = await axios.post(`${serverURL}/upload`, data, {
        headers: {
          "api-key": secret,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      setTitle("");
      setContent("");
      setImages([]);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="editor-container">
      <div className="input-grp">
        <h2>Blog Title</h2>
        <input
          type="text"
          placeholder="What's today's topic?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-grp">
        <h2>Blog Content</h2>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: "400px" }}
        />
      </div>
      <div className="img-input">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button className="btn" onClick={submitData}>
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default Editor;
