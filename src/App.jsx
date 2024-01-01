import "./App.css";
import Editor from "./components/Editor";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Editor />
      <ToastContainer />
    </>
  );
}

export default App;
