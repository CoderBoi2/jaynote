import axios from "axios";

const pinNoteService = (token, note) =>
  axios.post(
    `/api/notes/pin/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );

export { pinNoteService };
