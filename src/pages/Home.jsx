import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import StepperComponent from "./Stepper";
import {
  isValidEmail,
  isValidPassword,
  isValidFastName,
  isValidLastName,
  isValidPhoneNumber,
  isValidCountryCode,
  isValidTermsAndCondition,
} from "../partten";

const steps = ["Form One", "Form Two", "Form Three"];

export default function Home() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });
  // const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    if (name === "phoneNumber" && type !== "checkbox") {
      // Replace non-numeric characters with numeric values
      processedValue = value.replace(/\D/g, "");
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : processedValue,
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      countryCode: "",
      phoneNumber: "",
      acceptTermsAndCondition: false,
    });
  };

  // form

  const countryCodes = [
    { value: "+91", label: "India" },
    { value: "+1", label: "America" },
  ];

  const handleNext = () => {
    // handle validation for Form one
    if (activeStep === 0) {
      let errorEmail =
        !isValidEmail(formData.email) || formData.email == ""
          ? "Invalid email Or This field is required"
          : "";
      let errorPassword =
        !isValidPassword(formData.password) || formData.password == ""
          ? "Invalid password Or This field is required"
          : "";
      setErrors({ ...errors, email: errorEmail, password: errorPassword });
      if (
        isValidEmail(formData.email) &&
        formData.email &&
        isValidPassword(formData.password) &&
        formData.password
      ) {
        const newActiveStep = activeStep < 2 ? activeStep + 1 : 2;
        setActiveStep(newActiveStep);
      }
    }
    if (activeStep === 1) {
      let errorFirstName =
        !isValidFastName(formData.firstName) || formData.firstName === ""
          ? "Invalid first name or this field is required"
          : "";
      let errorLastName =
        formData.lastName !== "" && !isValidLastName(formData.lastName) ? "Invalid last name" : "";
      let errorAddress =
        formData.address.length < 10 ? "Address must be at least 10 characters long" : "";
      setErrors({
        ...errors,
        firstName: errorFirstName,
        lastName: errorLastName,
        address: errorAddress,
      });
      if (
        isValidFastName(formData.firstName) &&
        formData.firstName &&
        (formData.lastName === "" || isValidLastName(formData.lastName)) &&
        formData.address.length >= 10
      ) {
        const newActiveStep = activeStep < 2 ? activeStep + 1 : 2;
        setActiveStep(newActiveStep);
      }
    }
  };

  const PostData = async (payload) => {
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const jsonData = await response.json();

      if (jsonData.message == "Success") {
        handleReset();
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async () => {
    // Check last from is fill or not
    if (activeStep === 2) {
      let errorCountryCode =
        !isValidCountryCode(formData.countryCode) && formData.countryCode === "" ? "requird*" : "";
      let errorPhoneNumber =
        formData.phoneNumber.length !== 10 || formData.phoneNumber === ""
          ? "Invalid phone number or this field is required"
          : "";
      let errorTermsAndCondition = !isValidTermsAndCondition(formData.acceptTermsAndCondition)
        ? "You must accept the terms and conditions"
        : "";
      setErrors({
        ...errors,
        countryCode: errorCountryCode,
        phoneNumber: errorPhoneNumber,
        acceptTermsAndCondition: errorTermsAndCondition,
      });

      // Check if all fields are valid before proceeding to the next step
      if (
        isValidCountryCode(formData.countryCode) &&
        formData.countryCode &&
        isValidPhoneNumber(formData.phoneNumber) &&
        formData.phoneNumber &&
        isValidTermsAndCondition(formData.acceptTermsAndCondition)
      ) {
        const newActiveStep = activeStep < 2 ? activeStep + 1 : 2;
        setActiveStep(newActiveStep);
      }
    }
    // Check if all fields are not empty
    const isNotEmpty =
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.firstName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.countryCode.trim() !== "" &&
      formData.phoneNumber.trim() !== "";
    // Check if there are no errors in the error object
    const noErrors =
      Object.keys(errors).every((key) => errors[key] === "") || Object.keys(errors).length === 0;
    const termsAccepted = formData.acceptTermsAndCondition;

    if (isNotEmpty && noErrors && termsAccepted) {
      let payload = {
        emailId: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
      };
      PostData(payload);
    } else {
      alert("please fill all the required field");
    }
  };

  console.log(formData, "edwe");

  return (
    <Box className="main_body">
      <Box
        sx={{
          mt: 8,
          p: 5,
        }}
        className="Form_body"
      >
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            {/* handle form component with activeStep value */}
            <Box sx={{ mt: 4, mb: 2 }}>
              <React.Fragment>
                <form onSubmit={handleFormSubmit}>
                  {activeStep === 0 && (
                    <>
                      <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <Typography color="error">{errors.email}</Typography>}
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {errors.password && (
                        <Typography variant="caption" color="error">
                          {errors.password}
                        </Typography>
                      )}
                    </>
                  )}

                  {/*code  for from 2 */}
                  {activeStep === 1 && (
                    <>
                      <TextField
                        name="firstName"
                        label="First Name"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      {errors.firstName && (
                        <Typography color="error">{errors.firstName}</Typography>
                      )}
                      <TextField
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData.lastName}
                        onChange={handleChange}
                        variant="outlined"
                      />
                      {errors.lastName && <Typography color="error">{errors.lastName}</Typography>}
                      <TextField
                        name="address"
                        label="Address"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData.address}
                        onChange={handleChange}
                        variant="outlined"
                        required
                      />
                      {errors.address && <Typography color="error">{errors.address}</Typography>}
                    </>
                  )}

                  {/* code for form 3 */}

                  {activeStep === 2 && (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={4} sm={2}>
                          <TextField
                            select
                            name="countryCode"
                            label="Code"
                            value={formData.countryCode}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                          >
                            {countryCodes.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label} ({option.value})
                              </MenuItem>
                            ))}
                          </TextField>
                          {errors.countryCode && (
                            <Typography color="error">{errors.countryCode}</Typography>
                          )}
                        </Grid>
                        <Grid item xs={8} sm={9}>
                          <TextField
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                          />
                          {errors.phoneNumber && (
                            <Typography color="error">{errors.phoneNumber}</Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl required component="fieldset">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={formData.acceptTermsAndCondition}
                                    onChange={handleChange}
                                    name="acceptTermsAndCondition"
                                  />
                                }
                                label="I accept the terms and conditions"
                              />
                            </FormGroup>
                          </FormControl>
                          {errors.acceptTermsAndCondition && (
                            <Typography color="error">{errors.acceptTermsAndCondition}</Typography>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                </form>
              </React.Fragment>
            </Box>

            <StepperComponent
              activeStep={activeStep}
              handleBack={handleBack}
              handleFormSubmit={handleFormSubmit}
              handleNext={handleNext}
            />
          </React.Fragment>
        </div>
      </Box>
    </Box>
  );
}
