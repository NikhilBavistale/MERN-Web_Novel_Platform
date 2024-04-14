import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Alert,
  FileInput,
  Spinner,
} from "flowbite-react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import ReactSelect from "react-select";
import ToastComponent from "../ToastComponent";

export default function UpdateNovel() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [genres, setGenres] = useState([]);
  const [defaultGenres, setDefaultGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const { novelId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNovelsById = async () => {
      const res = await fetch(`/api/novels/${novelId}`);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      const data = await res.json();
      return data;
    };
    fetchNovelsById()
      .then((novelData) => {
        if (novelData) {
          setFormData(novelData);

          const defaultGenres =
            Array.isArray(novelData.genres) && novelData.genres.length > 0
              ? novelData.genres.map((genre) => ({
                  value: genre._id,
                  label: genre.name,
                }))
              : [];
          setDefaultGenres(defaultGenres);
        }
      })
      .catch((error) => {
        setPublishError("An error occurred while fetching data");
        console.error(error);
      });
  }, [novelId]);

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/novels/update/${novelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setPublishSuccess("Novel updated successfully");
        setTimeout(() => {
          navigate(`/dashboard?tab=manage`);
        }, 2000);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  const handleInputChange = (e, field) => {
    const newFormData = { ...formData };
    newFormData[field] = e.target.value;
    setFormData(newFormData);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error occurred while fetching data</p>
      </div>
    );
  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h2 className="my-7 text-2xl sm:text-3xl text-center font-bold">
        Update Novel
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* first row title  and author name */}
        <div>
          <Label htmlFor="title" value="Novel Title" />
          <TextInput
            id="title"
            name="title"
            type="text"
            placeholder="Novel Name"
            defaultValue={formData.title}
            required
            onChange={(e) => handleInputChange(e, "title")}
          />
        </div>
        <div>
          <Label htmlFor="authorName" value="Author Name" />
          <TextInput
            id="authorName"
            name="authorName"
            type="text"
            placeholder="Author Name"
            defaultValue={formData.authorName}
            required
            onChange={(e) => handleInputChange(e, "authorName")}
          />
        </div>

        {/* second row image and genre*/}
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
        <div>
          <Label htmlFor="inputState" value="Novel Genre" />
          <ReactSelect
            key={defaultGenres.map((genre) => genre.value).join(",")}
            isMulti
            placeholder="Select Genres"
            className="block w-full rounded-lg border text-sm"
            options={options}
            defaultValue={defaultGenres}
            onChange={(selectedOptions) => {
              const selectedGenreIds = selectedOptions.map(
                (option) => option.value
              );
              setFormData({ ...formData, genres: selectedGenreIds });
            }}
          />
        </div>

        {/* third row novel description */}
        <div className="md:col-span-2">
          <Label htmlFor="preview" value="Cover Preview" />
          {formData.imageURL && (
            <img
              src={formData.imageURL}
              alt="upload"
              className="object-cover rounded-lg w-20 h-50"
            />
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description" value="Novel Description" />
          <Textarea
            id="description"
            name="description"
            placeholder="Write your novel description..."
            required
            className="w-full"
            rows={6}
            defaultValue={formData.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="md:col-span-2"
        >
          Update
        </Button>

        {publishError && (
          <div>
            <ToastComponent message={publishError} type="error" />
          </div>
        )}
        {publishSuccess && (
          <div className="fixed bottom-5 left-5">
            <ToastComponent message={publishSuccess} type="success" />
          </div>
        )}
      </form>
    </div>
  );
}
