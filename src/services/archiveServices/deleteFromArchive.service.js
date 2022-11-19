import axios from "axios";

const deleteFromArchiveService = (token, id) =>
  axios.delete(`/api/archives/delete/${id}`, {
    headers: { authorization: token },
  });

export { deleteFromArchiveService };
