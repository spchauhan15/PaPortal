import { useEffect } from "react"
import ProviderForm from "./providersearchform"
import MemberForm from "./membersearchform"
import DrugForm from "./drugsearchform"
// import { Stepper, StepLabel, Step } from "@material-ui/core"
import { Testcontext } from "./_app"
import RadioButtonsGroup from "./createpafinalform"
import Link from "next/link"
import { Grid } from "@material-ui/core"
import Router from "next/router"
import Divider from "@material-ui/core/Divider"

import Moment from 'moment'


const redirectTo = "/"
// import { Grid } from "@material-ui/core"

// function FinalForm() {
//   const { currentStep, setStep, finalData, setFinalData } = useContext(
//     Testcontext
//   )
//   useEffect(() => {
//     setFinalData({})
//   }, [])

//   function showStep(step) {
//     switch (step) {
//       case 1:
//         return <MemberForm />
//       case 2:
//         return <ProviderForm />
//       case 3:
//         return <DrugForm />
//       case 4:
//         return <RadioButtonsGroup />
//     }
//   }
//   return (
//     <div>
//       <div>
//         <Grid>
//           <Grid item xs={12}>
//             <Stepper
//               style={{ width: "30%", marginTop: "6%", marginLeft: "30%" }}
//               activeStep={currentStep - 1}
//               orientation="vertical"
//             >
//               <Step>
//                 <StepLabel>MEMBER search</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>PROVIDER search</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>DRUG search</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>Create PA</StepLabel>
//               </Step>
//             </Stepper>
//           </Grid>
//         </Grid>
//       </div>

//       {showStep(currentStep)}
//       {/* <ProviderForm />
//       <MemberForm />
//       <DrugForm /> */}
//     </div>
//   )
// }

// export default FinalForm
//asdfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjakl

import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
//import Router from "next/dist/next-server/lib/router/router"

import PropTypes from "prop-types"

import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import Box from "@material-ui/core/Box"
import { Card, CardActions, CardContent, StepButton } from "@material-ui/core"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "5%"
    // marginLeft: "10%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  rootfortabdiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))


let stepDescription2 = ["Member Search", "Provider Search", "Drug Search", "Create PA"]

function getSteps2() {
  //return ["Member Search", "Provider Search", "Drug Search", "Create PA"]
  return stepDescription2
}


export default function VerticalLinearStepper() {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { currentStep, setStep, finalData, setFinalData,           
    step1Description,
    setStep1Description,
    step2Description,
    setStep2Description,
    step3Description,
    setStep3Description,
    step4Description,
    setStep4Description, } = useContext(Testcontext)

  function getSteps() {
    //return ["Member Search", "Provider Search", "Drug Search", "Create PA"]
    return [step1Description, step2Description, step3Description, step4Description]
  }

  function getStepContent(step) {
    //console.log('step =================>>>>' + step)
    console.log(JSON.stringify(finalData.membersData))
    switch (step) {
      case 0:
        if (finalData.membersData) {
          return (
            <Card>
              <CardContent>
                <Typography>
                  <Divider light />
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      First Name:{" "}
                      {finalData.membersData.fName}
                    </Grid>
                    <Grid item xs={4}>
                     Last Name: {finalData.membersData.lName}
                    </Grid>
                    <Grid item xs={4}>
                      Date of Birth: {!finalData.membersData.dob ? '' : Moment(Moment(finalData.membersData.dob).format('YYYY-MM-DD')).format('MM/DD/YYYY')}
                    </Grid>
                  </Grid>
                  <Divider light />
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      Address:{" "}
                      {finalData.membersData.addr1}
                    </Grid>
                    <Grid item xs={4}>
                     City: {finalData.membersData.city}
                    </Grid>
                    <Grid item xs={4}>
                      State: {finalData.membersData.state}
                    </Grid>
                    <Grid item xs={4}>
                      ZIP: {finalData.membersData.zip}
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    setFinalData({ ...finalData, membersData: null })
                  }
                >
                  Change
                </Button>
                <Button onClick={() => setStep(2)}>OK</Button>
              </CardActions>
            </Card>
          )
        } else {
          return <MemberForm />
        }

      case 1:
        if (finalData.providersData) {
          return (
            <Card>
              <CardContent>
                <Typography>
                  <Divider light />
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      Provider's First Name:{" "}
                      {finalData.providersData.basic.first_name}
                    </Grid>
                    <Grid item xs={4}>
                      Provider's Last Name: {finalData.providersData.basic.last_name}
                    </Grid>
                    <Grid item xs={4}>
                      NPI: {finalData.providersData.number}
                    </Grid>
                    <Grid item xs={4}>
                      Phone: {finalData.providersData.addresses[0].telephone_number}
                    </Grid>
                    <Grid item xs={4}>
                      Fax: {finalData.providersData.addresses[0].fax_number}
                    </Grid>                    
                  </Grid>
                  <Divider light />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    setFinalData({ ...finalData, providersData: null })
                  }
                >
                  Change
                </Button>
                <Button onClick={() => setStep(3)}>OK</Button>

                <Button onClick={() => setStep(1)}>BACK</Button>
              </CardActions>
            </Card>
          )
        } else {
          return <ProviderForm />
        }
      case 2:
        if (finalData.drugsData) {
          return (
            <Card>
              <CardContent>
                <Typography>
                  <Divider light />
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      Drug Name:{" "}
                      {finalData.drugsData.productNameAbbreviation}
                    </Grid>
                    <Grid item xs={4}>
                      NDC: {finalData.drugsData.productId}
                    </Grid>
                    <Grid item xs={4}>
                      GPI: {finalData.drugsData.gpi}
                    </Grid>
                  </Grid>
                  <Divider light />
                </Typography>

              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    setFinalData({ ...finalData, drugsData: null })
                  }
                >
                  Change
                </Button>
                <Button onClick={() => setStep(4)}>OK</Button>
                <Button onClick={() => setStep(2)}>BACK</Button>
              </CardActions>
            </Card>
          )
        } else {
          return <DrugForm />
        }
      case 3:
        return <RadioButtonsGroup />
      default:
        //console.log('step =================>>>> CASE DEFAULT' + step)
        return "Unknown step"
    }
  }

  // const [activeStep, setActiveStep] = React.useState(0)

  const steps = getSteps()

  const handleNext = () => {
    setStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setStep(0)
  }

  return (
    <div className={classes.root}>
      {/* <div> */}
        <Stepper activeStep={currentStep - 1} orientation="vertical">
          {/* {console.log(steps)} */}
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton>{label}</StepButton>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    {/* <Button
                    disabled={currentStep === 1}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button> */}

                    {/* {currentStep !== steps.length && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )} */}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      {/* </div> */}
      {/* {currentStep === steps.length + 1 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you are finished</Typography>
         
        </Paper>
      )} */}

    </div>
  )
}