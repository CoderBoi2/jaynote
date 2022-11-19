import { toast } from "react-toastify";
import { restoreFromArchives } from "../../services/";

const restoreArchivesHandler = async (
  token,
  note,
  notes,
  archives,
  archiveDispatch,
  notesDispatch
) => {
  try {
    const response = await restoreFromArchives(token, note, notes, archives);
    if (response.status === 200) {
      archiveDispatch({
        type: "REMOVE_FROM_ARCHIVES",
        payload: response.data.archives,
      });

      notesDispatch({ type: "ADD_NOTE", payload: response.data.notes });

      toast.info("Note restored successfully");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { restoreArchivesHandler };
