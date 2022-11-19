import { toast } from "react-toastify";
import { getTrashService } from "../../services";

const getTrashHandler = async (token, trashDispatch) => {
  try {
    const response = await getTrashService(token);
    if (response.status === 200) {
      trashDispatch({ type: "LOAD_TRASH", payload: response.data.trash });
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { getTrashHandler };
