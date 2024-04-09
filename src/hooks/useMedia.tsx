import { useAppDispatch } from "../app/hooks";
import { getImageData, getMediaList, setLoading } from "../app/mediasSlice";
import { Image } from "../interfaces";
import { services } from "../api/services";

export default function useMedia() {
  const dispatch = useAppDispatch();

  const getTrendingMedia = () => {
    dispatch(setLoading(true));
    services
      .getList()
      .then((res: MediaList) => {
        dispatch(getMediaList(res));
        dispatch(setLoading(false));
      })
      .catch((error: Error) => {
        throw new Error("error", error);
      });
  };

  const getImageConfig = () => {
    services
      .getInitialData()
      .then((res: Image) => {
        dispatch(getImageData(res));
      })
      .catch((error: Error) => {
        throw new Error("error", error);
      });
  };

  return { getTrendingMedia, getImageConfig };
}
