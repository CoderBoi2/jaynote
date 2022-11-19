import axios from "axios";

const removeFromTrashService = (token, id) =>
  axios.delete(`/api/trash/delete/${id}`, {
    headers: { authorization: token },
  });

export { removeFromTrashService };
