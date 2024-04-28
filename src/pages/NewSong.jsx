import React, { memo, useCallback, useEffect, useState } from "react";
import classes from "./NewSong.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
function NewSong() {
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    audio: null,
    image: null,
    releaseYear: new Date(),
  });
  const onChangehandler = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" || name === "audio") {
      const selectedFile = files[0];
      setFormSubmit({
        ...formSubmit,
        [name]: selectedFile,
      });
    } else {
      setFormSubmit({
        ...formSubmit,
        [name]: value,
      });
    }
  };
  console.log(formSubmit);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData();
    formData.append("title", formSubmit.title);
    formData.append("artist", formSubmit.artist);
    formData.append("album", formSubmit.album);
    formData.append("genre", formSubmit.genre);
    formData.append("releaseYear", formSubmit.releaseYear);
    formData.append("image", formSubmit.image);
    formData.append("audio", formSubmit.audio);
    console.log(formData);
    axios
      .post("http://localhost:5000/admin/add-song", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        navigate("/song");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.gallery}>
      <h1>New Songs</h1>

      {/* Hiển thị danh sách ảnh đã chọn */}
      <form
        method="POST"
        className={classes.form}
        encType="multipart/form-data"
        onSubmit={formSubmitHandler}
      >
        {/* Input để chọn ảnh mới */}
        <div className={classes.groupInput}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={onChangehandler}
            className={classes["form-control"]}
          />
        </div>
        <div className={classes.groupInput}>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            onChange={onChangehandler}
            className={classes["form-control"]}
          />
        </div>
        <div className={classes.groupInput}>
          <label htmlFor="album">Album</label>
          <input
            type="text"
            id="album"
            name="album"
            onChange={onChangehandler}
            className={classes["form-control"]}
          />
        </div>
        {/* Thể loại */}
        <div className={classes.groupInput}>
          <label htmlFor="genre">Thể Loại</label>
          <input
            type="text"
            id="genre"
            name="genre"
            onChange={onChangehandler}
            className={classes["form-control"]}
          />
        </div>

        <div className={classes.groupInput}>
          <label htmlFor="image" className={classes["custom-file-label"]}>
            Thêm ảnh
          </label>
          <input
            type="file"
            id="image"
            name="image"
            // accept="image/*"
            onChange={onChangehandler}
            className={`custom-file-input ${classes.inputAvt}`}
          />
        </div>

        <div className={classes.groupInput}>
          <label htmlFor="audio" className={classes["custom-file-label"]}>
            Thêm file âm nhạc
          </label>
          <input
            type="file"
            id="audio"
            name="audio"
            // accept="image/*"
            onChange={onChangehandler}
            className={`custom-file-input ${classes.inputAvt}`}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default memo(NewSong);
