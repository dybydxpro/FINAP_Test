import {
    GETALL_CLASSROOM,
    GETONE_CLASSROOM,
    CREATE_CLASSROOM,
    UPDATE_CLASSROOM,
    UPDATESTATUS_CLASSROOM,
    DELETE_CLASSROOM
} from "./Actions";
import Services from "../../Services";

export const createTutorial = (title, description) => async (dispatch) => {
    try {
      const res = await TutorialDataService.create({ title, description });
      dispatch({
        type: CREATE_TUTORIAL,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
