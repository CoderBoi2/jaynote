import axios from "axios";

const restoreFromArchives = (token, note, notes, archives) =>
  axios.post(
    `/api/archives/restore/${note._id}`,
    { notes, archives },
    { headers: { authorization: token } }
  );

export { restoreFromArchives };
