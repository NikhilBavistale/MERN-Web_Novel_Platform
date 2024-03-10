import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateChapter() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { novelId, chapterId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(
          `/api/novels/${novelId}/chapters/${chapterId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chapter");
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setPublishError("Failed to fetch chapter");
      }
    };
    fetchChapter();
  }, [novelId, chapterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    try {
      const response = await fetch(
        `/api/novels/${novelId}/chapters/${chapterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      navigate(`/novels/${novelId}/manage`);
    } catch (error) {
      setPublishError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update chapter
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            defaultValue={formData.title}
          />
        </div>
        <ReactQuill
          theme="snow"
          defaultValue={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update chapter
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
