import axios from "axios";

const addNoteService = (token, note) =>
  axios.post("/api/notes", { note }, { headers: { authorization: token } });

export { addNoteService };
