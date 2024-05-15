import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormOne from '../Form/FormOne';

const steps = ['Form One', 'Form Two', 'Form Three'];

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

  return (
    <Box sx={{width:'100%', display: 'flex', justifyContent: 'center' }}>
    <Box sx={{minWidth:'70%',  display: 'flex',flexDirection:'column', justifyContent: 'center',mt:8,boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',p:5 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
 
          <React.Fragment>
          {/* handle form component with activeStep value */}
          <Box sx={{mt:4,mb:2}}>

          {activeStep == 0 && <FormOne/>}
          </Box>
    
          
            <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:'right', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              
            <Button>
            Save and Next
            </Button>
            </Box>
          </React.Fragment>
   
      </div>
    </Box>
    </Box>
  );
}