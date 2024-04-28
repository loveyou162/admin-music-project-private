import classes from "./Song.module.scss";
import axios from "axios";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
function Song() {
  const allSong = useLoaderData();
  console.log(allSong);
  return (
    <div className={classes.song}>
      <h1>All Songs </h1>
      <table className={classes.tableGallery}>
        <thead>
          <tr>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th>genre</th>
            <th>image</th>
            <th>Song</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allSong.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                <img src={song.imageUrl} alt={song.title} width={100} />
              </td>
              <td>
                <audio controls>
                  <source src={song.song_path} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {/* <audio src={song.song_path} /> */}
              </td>
              <td>
                <Form method="delete" action="/song">
                  <Link>Edit</Link>
                  <input type="hidden" value={song._id} name="songId" />
                  <button type="submit">Delete</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Song;
export async function loader() {
  try {
    const response = await axios.get("http://localhost:5000/admin/all-song", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Response({ message: "Cound not fetch!" }, { status: 500 });
  }
}
export async function action({ request }) {
  const data = await request.formData();
  const songId = data.get("songId");
  try {
    const isConfirmed = window.confirm("Are you sure you want to delete file!");
    if (isConfirmed) {
      await axios.delete(`http://localhost:5000/admin/delete-song/${songId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return redirect("/song");
    }
  } catch (error) {
    throw new Response({ message: error.message }, { status: 400 });
  }
}
