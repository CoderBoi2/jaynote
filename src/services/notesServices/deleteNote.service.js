import axios from "axios";

const deleteNoteService = (token, id) =>
  axios.delete(`/api/notes/${id}`, { headers: { authorization: token } });

export { deleteNoteService };
