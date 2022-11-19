import { toast } from "react-toastify";
import { pinNoteService } from "../../services";

const pinNoteHandler = async (token, note, notesDispatch) => {
  try {
    const response = await pinNoteService(token, note);
    if (response.status === 200) {
      notesDispatch({ type: "EDIT_NOTE", payload: response.data.notes });
    } else {
      throw new Error("Sorry!! Something Went Wrong...Try again later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { pinNoteHandler };
