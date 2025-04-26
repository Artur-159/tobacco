import { useRef } from "react";
import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { VideoImageAPI } from "../../../services/videos-image";
import { isDeleteImage } from "../../../store/image/slice";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./styles.module.scss";

const VideosImages = ({
  name,
  title = "Choose videos, Images",
  control,
  className,
  images,
  error,
  disabled = false,
  multiple = true,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const {
    field: { name: fieldName, onChange },
  } = useController({
    name,
    control,
  });

  const baseURL = process.env.REACT_APP_BASE_URL_IMG;
  const changeSectionItem = (e) => {
    const { files } = e.target;
    const selected = Array.from(files);
    onChange(selected);
    dispatch(VideoImageAPI.postVideosImages({ media: selected }));
  };

  const deleteImage = (index) => {
    dispatch(isDeleteImage(index));
  };

  return (
    <div className={clsx(className)}>
      <div className={styles.img_input}>
        <label>
          <span>{title}</span>
          <input
            type="file"
            name={fieldName}
            ref={fileInputRef}
            disabled={disabled}
            multiple={multiple}
            accept="image/*,video/*"
            onChange={changeSectionItem}
            size={"small"}
          />
        </label>
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
      {
        <ul className={styles.img_box}>
          {images &&
            images?.map((item, index) => (
              <li key={index}>
                {item?.path && item.file_type === "image" ? (
                  <img src={`${baseURL}${item?.path}`} alt={item?.path} />
                ) : item.file_type === "video" ? (
                  <video width="150" height="100" controls>
                    <source src={`${baseURL}${item?.path}`} type={item?.type} />
                  </video>
                ) : (
                  <img src={`${baseURL}${item}`} alt={item?.path} />
                )}
                <ClearIcon
                  className={styles.clear_icon}
                  onClick={() => deleteImage(index)}
                />
              </li>
            ))}
        </ul>
      }
    </div>
  );
};

export default VideosImages;
