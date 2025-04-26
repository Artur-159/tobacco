import MainButton from "../button/button";
import AddIcon from "@mui/icons-material/Add";

const CreateBtn = ({ className, onClick, text }) => {
  const adminRole = localStorage.getItem("adminRole");

  if (Number(adminRole) === 1 || Number(adminRole) === 2) return null;

  return (
    <MainButton
      onClick={onClick}
      variant="contained"
      className={className}
      startIcon={<AddIcon />}
    >
      {text}
    </MainButton>
  );
};

export default CreateBtn;
