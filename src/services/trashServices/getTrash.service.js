import axios from "axios";

const getTrashService = (token) =>
  axios.get("/api/trash", { headers: { authorization: token } });

export { getTrashService };
