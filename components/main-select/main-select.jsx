import { useMemo } from "react";
import { useController } from "react-hook-form";
import Select from "react-select";
import clsx from "clsx";

import styles from "./styles.module.scss";

const MainSelect = ({
  className,
  error,
  name,
  control,
  options = [],
  placeholder,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isFormatOptions = false,
  onClose,
}) => {
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const handleChange = (selected) => {
    const newValue = selected
      ? isMulti
        ? selected.map((opt) => opt.value)
        : selected.value
      : null;

    onChange(newValue);
  };

  const formattedValue = useMemo(() => {
    return isMulti
      ? options.filter((option) => value?.includes(option.value))
      : options.find((option) => option.value === value) || null;
  }, [isMulti, options, value]);

  const formatOptionLabel = isFormatOptions
    ? (option) => (
        <div className={styles.options_block}>
          <img
            width={35}
            height={30}
            loading="lazy"
            alt={option.value}
            style={{ objectFit: "contain" }}
            src={`${process.env.REACT_APP_BASE_URL_IMG}${option.image}`}
          />
          <span>{option.label}</span>
        </div>
      )
    : undefined;

  return (
    <div>
      <Select
        isMulti={isMulti}
        options={options}
        onMenuClose={onClose}
        isClearable={!isMulti}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        menuPortalTarget={document.body}
        formatOptionLabel={formatOptionLabel}
        className={clsx(className, styles.select)}
        isDisabled={isDisabled || options.length === 0}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 99999 }) }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MainSelect;
