import { toast } from "react-toastify";
import { addToArchivesService } from "../../services";

const addToArchiveHandler = async (
  token,
  note,
  archiveDispatch,
  notesDispatch
) => {
  try {
    const response = await addToArchivesService(token, note);
    if (response.status === 201) {
      archiveDispatch({
        type: "ADD_TO_ARCHIVES",
        payload: response.data.archives,
      });

      notesDispatch({ type: "REMOVE_NOTE", payload: response.data.notes });

      toast.info("Note moved to archives");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { addToArchiveHandler };
