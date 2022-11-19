import axios from "axios";

const restoreFromTrashService = (token, note, notes, trash) =>
  axios.post(
    `/api/trash/restore/${note._id}`,
    { notes, trash },
    { headers: { authorization: token } }
  );

export { restoreFromTrashService };
