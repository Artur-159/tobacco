import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { setSaveFileIndex } from "../../../store/file/slice";
import { FileAPI } from "../../../services/file";

import styles from "./styles.module.scss";

const UploadFile = ({
  name,
  title = "Choose files",
  control,
  className,
  disabled = false,
  multiple = false,
  error,
  url,
  index,
  accept = ".pdf, .doc, .docx, .jpg, .msg",
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { listFile } = useSelector((state) => state.file);

  const [fileNames, setFileNames] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const {
    field: { name: fieldName, onChange, value },
  } = useController({
    name,
    control,
  });

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    const maxFileSize = 20480 * 1024;
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > maxFileSize
    );

    if (oversizedFiles.length > 0) {
      alert(
        "Ֆայլը գերազանցում է 20ՄԲ առավելագույն չափի սահմանափակումը ընտրեք այլ ֆայլ։"
      );
      return;
    }

    setFileNames(selectedFiles.map((file) => file.name));

    if (
      selectedFiles.length > 0 &&
      selectedFiles[0].type.startsWith("image/")
    ) {
      setImagePreview(URL.createObjectURL(selectedFiles[0]));
    } else {
      setImagePreview(null);
    }

    onChange(selectedFiles);
    dispatch(FileAPI.postUploadFiles({ file: selectedFiles, url }));
    if (index !== undefined) {
      dispatch(setSaveFileIndex(index));
    }
  };

  useEffect(() => {
    if (!value || value.length === 0) {
      setFileNames([]);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [value]);

  return (
    <div>
      <div className={clsx(className, styles.upload_file)}>
        <div className={styles.dropzone}>
          <label>
            <img src="/icons/upload-file.svg" alt="upload" />
            <span>{title}</span>
            <input
              type="file"
              name={fieldName}
              ref={fileInputRef}
              disabled={disabled}
              multiple={multiple}
              accept={accept}
              onChange={handleFileChange}
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

      {imagePreview ? (
        <div className={styles.image_preview}>
          <img width={180} height={160} alt="Preview" src={imagePreview} />
        </div>
      ) : value?.path && value.type.startsWith("image") ? (
        <div className={styles.image_preview}>
          <img
            width={180}
            height={160}
            alt="Preview"
            src={BASE_URL + value.path}
          />
        </div>
      ) : null}

      {fileNames.length > 0 && listFile.length > 0 && (
        <ul className={styles.file_list}>
          {fileNames.map((fileName, index) => (
            <li key={index}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={styles.file_link}
                href={`${BASE_URL}${listFile[index]?.file?.path}`}
              >
                <em>{fileName}</em>
              </a>
            </li>
          ))}
        </ul>
      )}

      {value?.path ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.file_link}
          href={`${BASE_URL}${value.path}`}
        >
          <em>{value.path.split("/").pop()}</em>
        </a>
      ) : null}
    </div>
  );
};

export default UploadFile;
