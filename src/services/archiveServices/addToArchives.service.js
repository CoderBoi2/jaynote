import axios from "axios";

const addToArchivesService = (token, note) =>
  axios.post(
    `/api/notes/archives/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );

export { addToArchivesService };
