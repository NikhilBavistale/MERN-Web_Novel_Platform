import { Alert, Button, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ToastComponent from "../ToastComponent";

export default function CreateChapter() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const { novelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isFirstChapter) {
      setToastMessage("Write first chapter"); 
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    try {
      const res = await fetch(`/api/novels/${novelId}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const chapter = await res.json();
      if (!res.ok) {
        setPublishError(chapter.message);
        return;
      }
      setPublishSuccess("Chapter published successfully");
      setTimeout(() => {
        navigate(`/novels/${novelId}/manage`);
      }, 2000);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      {toastMessage && (
        <div className="fixed bottom-5 left-5">
          <ToastComponent message={toastMessage} type="info" />
        </div>
      )}
      <h1 className="text-center text-3xl my-7 font-semibold">
        Post a Chapter
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Chapter Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {publishSuccess && (
          <Alert className="mt-5" color="success">
            {publishSuccess}
          </Alert>
        )}
      </form>
    </div>
  );
}
