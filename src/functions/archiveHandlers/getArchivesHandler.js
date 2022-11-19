import { toast } from "react-toastify";
import { getArchivesService } from "../../services";

const getArchivesHandler = async (token, archiveDispatch) => {
  try {
    const response = await getArchivesService(token);
    if (response.status === 200) {
      archiveDispatch({
        type: "LOAD_ARCHIVES",
        payload: response.data.archives,
      });
    } else {
      throw new Error("Sorry! Something Went Wrong...Try Again Later");
    }
  } catch (error) {
    toast.error(error.response?.data.errors[0]);
  }
};

export { getArchivesHandler };
