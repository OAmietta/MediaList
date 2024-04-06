import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { services } from "./api/services";
import { getImagesData, getMediaList, selectMedias } from "./app/mediasSlice";
// import { Medias } from "./utils/interfaces";
import mediaList from "./templates/mediaList.json";
import imagesData from "./templates/imagesData.json";
import Home from "./pages/Home";

export default function App() {
  const dispatch = useAppDispatch();
  const medias = useAppSelector(selectMedias);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    // services
    //   .getInitialData()
    //   .then((res) => {
    //     console.log("response app: ", res);
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });

    // services
    //   .getList()
    //   .then((res) => {
    //     console.log("response app: ", res);
    //     dispatch(getMediaList(res));
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });
    dispatch(getImagesData(imagesData.images));
    dispatch(getMediaList(mediaList.results));
  };

  return (
    <div>
      <p>{JSON.stringify(medias)}</p>
      <Home />
    </div>
  );
}
