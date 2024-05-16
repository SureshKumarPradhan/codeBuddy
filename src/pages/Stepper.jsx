import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
const Stepper = (props) => {
  const { activeStep, handleBack, handleFormSubmit, handleNext } = props;
  Stepper.propTypes = {
    activeStep: PropTypes.number.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "right", pt: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Box />
        <Button type="submit" onClick={handleFormSubmit} sx={{ mr: 1 }}>
          Save
        </Button>

        <Button disabled={activeStep === 2} onClick={handleNext}>
          Save and Next
        </Button>
      </Box>
    </>
  );
};
export default Stepper;
