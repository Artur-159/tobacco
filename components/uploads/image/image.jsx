import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import { VideoImageAPI } from "../../../services/videos-image";
import BasicModal from "../../modal/modal";
import { setModalOpen } from "../../../store/modal/slice";
import { setDeleteImage } from "../../../store/image/slice";
import { Close, Clear, ZoomOutMap } from "@mui/icons-material";

import styles from "./styles.module.scss";

const Image = ({
  name,
  control,
  className,
  status,
  editImage,
  image,
  error,
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
    dispatch(VideoImageAPI.postImage({ image: files }));
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [status, dispatch, image]);

  const closeModal = () => {
    dispatch(setModalOpen(false));
  };

  const handleImageDelete = (image) => {
    dispatch(setDeleteImage(image));
  };

  return (
    <div className={className}>
      <div
        className={styles.img_input}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          name={fieldName}
          control={control}
          ref={fileInputRef}
          onChange={changeSectionItem}
        />
        <p>Ավելացնել լուսանկար</p>
      </div>
      {image || editImage ? (
        <>
          <img
            alt={image || editImage}
            className={styles.preview}
            src={`${baseURL}${image || editImage}`}
          />
          <Clear
            className={styles.clear_icon}
            onClick={() => handleImageDelete(image)}
          />
          <BasicModal
            color="text"
            title="Մեծացնել"
            startIcon={<ZoomOutMap />}
            className={styles.modal}
          >
            <div className={styles.modal_content}>
              <img
                height={430}
                alt={image || editImage}
                className={styles.big_img}
                src={`${baseURL}${image || editImage}`}
              />
              {/* <ClearIcon
                className={styles.clear_icon}
                onClick={() => handleImageDelete(image)}
              /> */}
              <Close
                color="error"
                fontSize="large"
                onClick={() => closeModal()}
                className={styles.close_icon}
              />
            </div>
          </BasicModal>
        </>
      ) : null}
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default Image;
