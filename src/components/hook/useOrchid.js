import { useEffect, useState } from "react";
import { ListOfOrchids } from "../Orchid/ListOfOrchids";

export const useOrchid = () => {
  const [orchidList, setOrchidList] = useState([]);
  useEffect(() => {
    setOrchidList(ListOfOrchids);
  }, []);
  return orchidList;
};
