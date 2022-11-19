import { toast } from "react-toastify";
import { getNotesService } from "../../services/";

const getNotesHandler = async (token, notesDispatch) => {
  try {
    const response = await getNotesService(token);
    if (response.status === 200) {
      notesDispatch({ type: "LOAD_NOTES", payload: response.data.notes });
    } else {
      throw new Error("Sorry!! Something Went Wrong...Try again later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { getNotesHandler };
