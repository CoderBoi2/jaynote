import { toast } from "react-toastify";
import { addNoteService } from "../../services";

const addNoteHandler = async (token, note, notesDispatch) => {
  try {
    const response = await addNoteService(token, note);
    if (response.status === 201) {
      notesDispatch({ type: "ADD_NOTE", payload: response.data.notes });
      toast.info("New Note Created Successfully");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { addNoteHandler };
