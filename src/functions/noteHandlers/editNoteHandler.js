import { toast } from "react-toastify";
import { editNoteService } from "../../services/";

const editNoteHandler = async (token, note, notesDispatch) => {
  const response = await editNoteService(token, note);
  try {
    if (response.status === 201) {
      notesDispatch({ type: "EDIT_NOTE", payload: response.data.notes });
      toast.info("Note Updated Successfully");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { editNoteHandler };
