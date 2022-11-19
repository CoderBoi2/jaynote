import { toast } from "react-toastify";
import { restoreFromTrashService } from "../../services";

const restoreFromTrashHandler = async (
  token,
  note,
  notes,
  trash,
  trashDispatch,
  notesDispatch
) => {
  try {
    const response = await restoreFromTrashService(token, note, notes, trash);
    if (response.status === 200) {
      trashDispatch({
        type: "REMOVE_FROM_TRASH",
        payload: response.data.trash,
      });
      notesDispatch({ type: "ADD_NOTE", payload: response.data.notes });
      toast.info("Note Restored Successfully");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { restoreFromTrashHandler };
