const allowedExtensions = ["pdf", "doc", "docx", "jpg", "msg"];

const validation = (fileList) => {
  if (!fileList || fileList.length === 0) {
    return "File is required";
  }

  const file = fileList[0];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return `Invalid file type. Allowed: ${allowedExtensions.join(", ")}`;
  }

  return true;
};
