import { toast } from "react-toastify";
import { deleteNoteService } from "../../services";

const deleteNoteHandler = async (token, note, notesDispatch, trashDispatch) => {
  try {
    const response = await deleteNoteService(token, note._id);
    if (response.status === 200) {
      trashDispatch({ type: "ADD_TO_TRASH", payload: response.data.trash });
      notesDispatch({ type: "REMOVE_NOTE", payload: response.data.notes });
      toast.info("Note moved to trash");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { deleteNoteHandler };
