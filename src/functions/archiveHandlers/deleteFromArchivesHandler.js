import { toast } from "react-toastify";
import { deleteFromArchiveService } from "../../services";

const deleteFromArchivesHandler = async (
  token,
  note,
  archiveDispatch,
  trashDispatch
) => {
  try {
    const response = await deleteFromArchiveService(token, note._id);
    if (response.status === 200) {
      trashDispatch({ type: "ADD_TO_TRASH", payload: response.data.trash });
      archiveDispatch({
        type: "REMOVE_FROM_ARCHIVES",
        payload: response.data.archives,
      });
      toast.info("Note moved to trash");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { deleteFromArchivesHandler };
