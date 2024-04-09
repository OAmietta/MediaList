import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getSimilarMediaList,
  selectMedias,
  setLoading,
  setSearchItem,
} from "../app/mediasSlice";
import { Medias, ResponseMedia } from "../interfaces";
import { services } from "../api/services";

export default function useDetails(
  type: string | undefined,
  id: string | undefined
) {
  const medias = useAppSelector(selectMedias);
  const dispatch = useAppDispatch();
  const [similarData, setSimilarData] = React.useState<
    Medias["similarMediaList"]
  >([]);
  const [slides, setSlides] = React.useState<number[]>([]);
  const pageData = medias.mediaList.find((item) => item.id.toString() == id);
  const [data, setData] = React.useState(pageData);

  const imgDetails = medias.imageDetails;

  useEffect(() => {
    if (medias.searchItem && type != undefined && id != undefined) {
      dispatch(setSearchItem(false));
      dispatch(setLoading(true));
      services
        .getMediaItem(type, parseInt(id))
        .then((res) => {
          setData(res);
          services
            .getSimilarMedia(type, res.id)
            .then((res: ResponseMedia) => {
              dispatch(getSimilarMediaList(res.results));
              setSlides(Array.from(Array(res.results.length).keys()));
              setSimilarData(res.results);
              dispatch(setLoading(false));
            })
            .catch((error) => {
              dispatch(setLoading(false));
              throw new Error("error", error);
            });
        })
        .catch((error) => {
          dispatch(setLoading(false));
          throw new Error("error", error);
        });
    }
  }, [id]);

  return { similarData, slides, data, imgDetails };
}
