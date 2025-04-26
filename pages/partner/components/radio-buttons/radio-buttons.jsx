import { RadioGroup, Radio, Sheet } from "@mui/joy";

const RadioButtons = ({ workingType, setWorkingType, className = "" }) => {
  const handleChange = (event) => {
    setWorkingType(event.target.value);
  };

  return (
    <RadioGroup
      aria-labelledby="working-type-label"
      value={workingType}
      onChange={handleChange}
      size="lg"
      className={className}
      sx={{
        gap: 1.5,
        display: "flex",
        flexDirection: "row",
        width: "400",
      }}
    >
      {[
        { value: "authorized", label: "Լիազորված անձ" },
        { value: "applicant", label: "Հայտատու անձ" },
      ].map(({ value, label }) => (
        <Sheet
          key={value}
          sx={{
            p: 1.5,
            borderRadius: "md",
            boxShadow: "sm",
          }}
        >
          <Radio
            label={label}
            overlay
            disableIcon
            value={value}
            slotProps={{
              label: ({ checked }) => ({
                sx: {
                  fontWeight: "lg",
                  fontSize: "md",
                  color: checked ? "#0b6bcb" : "#32383e",
                  height: "20px",
                },
              }),
              action: ({ checked }) => ({
                sx: (theme) => ({
                  ...(checked && {
                    "--variant-borderWidth": "2px",
                    "&&": {
                      borderColor: theme.vars.palette.primary[500],
                    },
                  }),
                }),
              }),
            }}
          />
        </Sheet>
      ))}
    </RadioGroup>
  );
};

export default RadioButtons;
