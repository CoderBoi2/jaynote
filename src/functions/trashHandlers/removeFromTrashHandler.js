import { toast } from "react-toastify";
import { removeFromTrashService } from "../../services";

const removeFromTrashHandler = async (token, note, trashDispatch) => {
  try {
    const response = await removeFromTrashService(token, note._id);
    if (response.status === 200) {
      trashDispatch({
        type: "REMOVE_FROM_TRASH",
        payload: response.data.trash,
      });
      toast.info("Note Deleted!!");
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { removeFromTrashHandler };
