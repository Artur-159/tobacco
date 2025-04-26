import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AttachCountryAPI } from "../services/attach-country";

const useAttachCountryData = (entityRoute, id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (entityRoute === "trademark") {
        dispatch(AttachCountryAPI.getOneAttachTradeMark(id));
      } else {
        dispatch(AttachCountryAPI.getOneAttachObjection(id));
      }
    };

    fetchData();
  }, [dispatch, id, entityRoute]);
};

export default useAttachCountryData;
