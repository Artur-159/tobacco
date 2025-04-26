import clsx from "clsx";
import TextInput from "../text-input/text-input";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";

const Search = ({ onSearch, className, control, name }) => {
  const handleSearch = () => {
    onSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={clsx(className, styles.search)}>
      <TextInput
        size="small"
        name={name}
        control={control}
        placeholder="Փնտրել"
        onKeyUp={handleKeyPress}
        className={styles.search_inp}
      />
      <SearchIcon onClick={handleSearch} className={styles.search_icon} />
    </div>
  );
};

export default Search;
