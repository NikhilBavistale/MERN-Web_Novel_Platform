import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  FileInput,
  Alert,
} from "flowbite-react";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

const CreateNovel = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [genres, setGenres] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) {
          const message = await response.text();
          setPublishError(message);
          return;
        }
        const genres = await response.json();
        setPublishError(null);
        setGenres(genres);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGenres();
  }, []);
  const options = genres.map((genre) => ({
    value: genre._id,
    label: genre.name,
  }));

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, imageURL: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleNovelSubmit = async (event) => {
    event.preventDefault();

    if (!formData.imageURL) {
      setPublishError("Please upload an image");
      return;
    }
    setPublishError(null);
    try {
      const response = await fetch("/api/novels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const novel = await response.json();
      if (!response.ok) {
        setPublishError(novel.message);
        return;
      }
      if (response.ok) {
        setPublishError(null);
        console.log(formData);

        setPublishSuccess("Successfully created novel");
        navigate(`/create-chapter/${novel._id}`);
      }
    } catch (error) {
      setPublishError("Failed to publish novel");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h2 className="my-7 text-2xl sm:text-3xl text-center font-bold">
        Write Novel Details
      </h2>
      <form
        onSubmit={handleNovelSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* first row title and author*/}
        {/* novel name  */}
        <div>
          <Label htmlFor="title" value="Novel Title" />
          <TextInput
            id="title"
            name="title"
            type="text"
            placeholder="Novel Name"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        {/* author name */}
        <div>
          <Label htmlFor="authorName" value="Author Name" />
          <TextInput
            id="authorName"
            name="authorName"
            type="text"
            placeholder="Author Name"
            onChange={(e) =>
              setFormData({ ...formData, authorName: e.target.value })
            }
          />
        </div>

        {/* second row image and genre */}
        {/* Novel cover image url  */}
        <div>
          <Label htmlFor="imageURL" value="Novel Cover" />
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            className="mt-2"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
        </div>

        {/* Genre */}
        <div>
          <Label htmlFor="inputState" value="Novel Genre" />

          <ReactSelect
            isMulti
            placeholder="Select Genres"
            className="block w-full rounded-lg border text-sm"
            options={options}
            onChange={(selectedOptions) => {
              const selectedGenreIds = selectedOptions.map(
                (option) => option.value
              );
              setFormData({ ...formData, genres: selectedGenreIds });
            }}
          />
        </div>

        {/* third row contain cover preview and description */}
        <div className="md:col-span-2">
          {/* Image preview */}
          <Label htmlFor="preview" value="Cover Preview" />
          {formData.imageURL && (
            <img
              src={formData.imageURL}
              alt="upload"
              className="object-cover rounded-lg w-20 h-50"
            />
          )}
        </div>
        {/* novel description */}
        <div className="md:col-span-2">
          <Label htmlFor="description" value="Synopsis" />
          <Textarea
            id="description"
            name="description"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Write your novel description..."
            className="w-full"
            rows={6}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="md:col-span-2"
        >
          Upload Novel
        </Button>
        {publishError && (
          <Alert className="mt-5 md:col-span-2" color="failure">
            {publishError}
          </Alert>
        )}
        {publishSuccess && (
          <Alert className="mt-5 md:col-span-2" color="success">
            {publishSuccess}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreateNovel;
