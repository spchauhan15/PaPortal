import React, { useContext, useState } from "react"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from "@material-ui/core/styles"
import { Testcontext } from "./_app"
import { Button, Typography, Link } from "@material-ui/core"
import isfetch from "isomorphic-unfetch"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Router from "next/router"

import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { Paper, Grid } from "@material-ui/core"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from "formik-material-ui"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import { Height, Label } from "@material-ui/icons"
import Autocomplete  from '@material-ui/lab/Autocomplete'

//import Select from '@material-ui/core/Select'

const RadioButtonsGroup = () => {
  //const [value, setValue] = React.useState("APP")
  const [msg, setMsg] = useState([])
  const [caseID, setCaseID] = useState(null)
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = React.useState('')
  const [errorPrescription, setErrorPrescription] = useState(false)
  const [helperTextPrescription, setHelperTextPrescription] = React.useState('')
  const [additionalDrugDetails, setadditionalDrugDetails] = useState({})

  const [daysSupply, setDaysSupply] = useState('')
  const [dispenseQuantity, setDispenseQuantity] = useState('')
  const [directionForUse, setDirectionForUse] = useState('')
  const [tierException, setTierException] = useState('No')
  const [siteOfAdministration, setSiteOfAdministration] = useState('')
  const [notes, setNotes] = useState('')

  const DirectionsList = [
    { DirectionsForUse: 'use/take as directed'},
    { DirectionsForUse: 'inject one dose every two weeks'},
    { DirectionsForUse: 'inject one dose six days a week'},
    { DirectionsForUse: 'apply twice a day'},
    { DirectionsForUse: 'inject one dose every other day'},
    { DirectionsForUse: 'inject one dose every month'},
    { DirectionsForUse: 'inject every one dose every two hours'},
    { DirectionsForUse: 'instill one drop twice daily'},
    { DirectionsForUse: 'take one dose weekly'},
    { DirectionsForUse: 'take one daily'},
    { DirectionsForUse: 'apply as directed'},
    { DirectionsForUse: 'take one twice daily'},
    { DirectionsForUse: 'take one every night at bedtime'},
    { DirectionsForUse: 'take one three times daily'},
    { DirectionsForUse: 'take one every morning'},
    { DirectionsForUse: 'apply every four hours'},
    { DirectionsForUse: 'take one every 6 hours'},
    { DirectionsForUse: 'take one every 8 hours'},
    { DirectionsForUse: 'take one every 4 hours'},
    { DirectionsForUse: 'infuse intravenously once a month'},
    { DirectionsForUse: 'infuse intravenously once yearly'},
    { DirectionsForUse: 'inhale one spray daily'},
    { DirectionsForUse: 'infuse intravenously every three weeks'},
    { DirectionsForUse: 'inhale two puffs daily'},
    { DirectionsForUse: 'inhale two puffs twice a day'},
    { DirectionsForUse: 'inhale one puff every six hours as needed'},
    { DirectionsForUse: 'inject one dose daily'},
    { DirectionsForUse: 'inject one dose weekly'},
    { DirectionsForUse: 'inject as directed'},
    { DirectionsForUse: 'inject twice daily before meals'},
    { DirectionsForUse: 'inject three times daily 30 min before meals'}
  ]
  
  const SiteOfAdminList = [
    {SiteOfAdministrationValue: 'Home Health'},
    {SiteOfAdministrationValue: 'Self Administered'},
    {SiteOfAdministrationValue: 'Long Term Care Facility'},
    {SiteOfAdministrationValue: 'MD Office Supply'},
    {SiteOfAdministrationValue: 'Retail Fill'},
    {SiteOfAdministrationValue: 'RxSol Suplying to MD'},
    {SiteOfAdministrationValue: 'Administered in MD Office'}
  ]
  
  const Tier = [
    { TierException: 'No'},
    { TierException: 'Yes'}
  ]

  const { finalData, setFinalData, setStep, 
    step1Description, 
    setStep1Description,  
    step2Description, 
    setStep2Description, 
    step3Description, 
    setStep3Description ,	
    step4Description,	
    setStep4Description} = useContext(Testcontext)

  const handleChange = event => {
    setHelperText(' ')
    setError(false)
    setFinalData({ ...finalData, reqtype: event.target.value })
  }

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setFinalData({})
    setOpen(false)
    setStep1Description('Member Search')
    setStep2Description('Provider Search')
    setStep3Description('Drug Search')
    //setStep4Description('')
    setStep(1)

    //Router.push("/FinalForm", "/PASubmissionForm")
  }

  const handleData = async () => {
    setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })

    //console.log(JSON.stringify(finalData.reqtype))	
    if (!finalData.reqtype)  {	
      setHelperText('Please select a case type.')
      setError(true)
    }	else if(!finalData.addDrugDetails.daysSupply) {
      setHelperTextPrescription('Please enter days supply.')
      setErrorPrescription(true)
    } else if(!finalData.addDrugDetails.dispenseQuantity) {
      setHelperTextPrescription('Please enter dispense quantity.')
      setErrorPrescription(true)
    } else if(!finalData.addDrugDetails.directionForUse) {
      setHelperTextPrescription('Please enter direction for use.')
      setErrorPrescription(true)
    } else if(!finalData.addDrugDetails.tierException) {
      setHelperTextPrescription('Please select tier exception.')
      setErrorPrescription(true)
    } else if(!finalData.addDrugDetails.siteOfAdministration) {
      setHelperTextPrescription('Please select site of administration.')
      setErrorPrescription(true)
    } else if(!finalData.addDrugDetails.notes) {
      setHelperTextPrescription('Please enter notes.')
      setErrorPrescription(true)
    } else{
      const url = "/api/createpa"
      setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
      const bodystring = {
        // UserName: "PAPORTAL",
        membersData: finalData.membersData,
        providersData: finalData.providersData,
        drugsData: finalData.drugsData,
        reqtype: finalData.reqtype,
        additionalDrugDetails: finalData.addDrugDetails
      }

      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodystring)
      }
      console.log(JSON.stringify(config))

      const returns = await isfetch(url, config)
      const responsecreatepa = await returns.json()
      //const {CaseId}=responsecreatepa
      const { Status } = responsecreatepa
      console.log(Status.Message)
      setMsg({ msg: Status.Message, code: Status.Code })

      if (Status.Message == "Success") {
        console.log(responsecreatepa.CaseID)
        setCaseID(responsecreatepa.CaseID)
        //alert(`The Request is accepted. CaseID->${responsecreatepa.CaseID}`)

        handleOpen()
      }
    }

  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
      marginLeft: "40%"
      // marginRight: "auto"
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    button: {
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(1)
    },
    gridContainer: {
      paddingLeft: "40px",
      paddingRight: "40px"
    },
    additionalDetailsPaper: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "5%",
      marginTop: "1%"
      // marginBottom: 0
    },
    additionalDetails2Paper: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "5%",
      marginTop: "0%",
      alignItems: "center",
      textAlign: "center"
      // marginBottom: 0
    },
    labelDesign: {
      // padding: 10,
      marginLeft: 300,
      marginTop: "10%",
      color: "orange",
      justifyContent: "center"
    }
  }))

  const classes = useStyles()

  return (
    <div>   
          <Formik>
            <Paper className={classes.additionalDetails2Paper}>
              <FormControl component="fieldset" error={error}>
                <FormLabel component="legend" style={{textAlign: "center",fontWeight: "bold"}}>Case Type</FormLabel>
                <Grid
                    container
                    direction="row"
                    spacing={4}
                    className={classes.gridContainer}
                    justify="center"
                    alignItems="center"
                  > 
                  <Grid item xs={12} justify="center" alignItems="center">
                    <RadioGroup
                      aria-label="caseType"
                      name="caseType"
                      value={finalData.reqtype}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="PA"
                        control={<Radio />}
                        label="Prior Authorization(PA)"
                      />
                      <FormControlLabel
                        value="APP"
                        control={<Radio />}
                        label="Appeal(APP)"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <FormHelperText style={{textAlign: "center", marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold"}}>{helperText}</FormHelperText>
              </FormControl>
            </Paper>
          </Formik>
          <br />
          <Formik
            initialValues={{
              daysSupply: {daysSupply},
              dispenseQuantity: {dispenseQuantity},
              directionForUse: {directionForUse},
              tierException: {tierException},
              siteOfAdministration: {siteOfAdministration},
              notes: {notes}
            }}
          >
            {/* <Form> */}
              <Paper className={classes.additionalDetailsPaper}>
                <FormControl component="fieldset" error={errorPrescription} >
                  <FormLabel component="legend" style={{textAlign: "center",fontWeight: "bold"}}>Prescription Details</FormLabel>
                  <Grid
                    container
                    direction="row"
                    spacing={4}
                    className={classes.gridContainer}
                    justify="center"
                    alignItems="center"
                  >
            
                    <Grid item xs={3}>
                      <Field
                        name="daysSupply"
                        component={TextField}
                        label="Days Supply"
                        value={daysSupply}
                        onChange={
                          e => {
                            setHelperTextPrescription('')
                            setErrorPrescription(false)
                            setDaysSupply(e.target.value)
                            setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                          }
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Field
                        name="dispenseQuantity"
                        component={TextField}
                        label="Dispense Quantity"
                        value={dispenseQuantity}
                        onChange={
                          e => {
                            setHelperTextPrescription('')
                            setErrorPrescription(false)
                            setDispenseQuantity(e.target.value)
                            setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                          }
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                      <InputLabel >Tier Exception</InputLabel >
                      <Field
                        fullWidth
                        placeholder="Tier Exception"
                        name="tierexception"
                        component={Select}
                        label="Tier Exception"
                        value={tierException}
                        onChange={
                          e => {
                            setHelperTextPrescription('')
                            setErrorPrescription(false)
                            setTierException(e.target.value)
                            setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                          }
                        }
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </Field>
                      </FormControl>
                    </Grid>
                
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                      <InputLabel >Site of Administration</InputLabel >
                      <Field
                        fullWidth
                        name="siteOfadministration"
                        component={Select}
                        placeholder="Site of Administration"
                        label="Site of Administration"
                        value={siteOfAdministration}
                        onChange={
                          e => {
                            setSiteOfAdministration(e.target.value)
                            setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                            setHelperTextPrescription('')
                            setErrorPrescription(false)
                          }
                        }
                      >
                        <option value="Home Health">Home Health</option>
                        <option value="Self Administered">Self Administered</option>
                        <option value="Long Term Care Facility">Long Term Care Facility</option>
                        <option value="MD Office Supply">MD Office Supply</option>
                        <option value="Retail Fill">Retail Fill</option>
                        <option value="RxSol Suplying to MD">RxSol Suplying to MD</option>
                        <option value="Administered in MD Office">Administered in MD Office</option>
                      </Field>
                      </FormControl>
                    </Grid>
                
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel >Direction For Use</InputLabel >
                        <Field 
                          fullWidth
                          name="directionForUse" 
                          as="select" 
                          component={Select}
                          label="Direction For Use"
                          value={directionForUse}
                          onChange={
                            e => {
                              setDirectionForUse(e.target.value)
                              setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                              setHelperText('')
                              setError(false)
                            }
                          }
                        >
                          <option value="use/take as directed">use/take as directed</option>
                          <option value="inject one dose every two weeks">inject one dose every two weeks</option>
                          <option value="inject one dose six days a week">inject one dose six days a week</option>
                          <option value="apply twice a day">apply twice a day</option>
                          <option value="inject one dose every other day">inject one dose every other day</option>
                          <option value="inject one dose every month">inject one dose every month</option>
                          <option value="inject every one dose every two hours">inject every one dose every two hours</option>
                          <option value="instill one drop twice daily">instill one drop twice daily</option>
                          <option value="take one dose weekly">take one dose weekly</option>
                          <option value="take one daily">take one daily</option>
                          <option value="apply as directed">apply as directed</option>
                          <option value="take one twice daily">take one twice daily</option>
                          <option value="take one every night at bedtime">take one every night at bedtime</option>
                          <option value="take one three times daily">take one three times daily</option>
                          <option value="take one every morning">take one every morning</option>
                          <option value="apply every four hours">apply every four hours</option>
                          <option value="take one every 6 hours">take one every 6 hours</option>
                          <option value="take one every 8 hours">take one every 8 hours</option>
                          <option value="take one every 4 hours">take one every 4 hours</option>
                          <option value="infuse intravenously once a month">infuse intravenously once a month</option>
                          <option value="infuse intravenously once yearly">infuse intravenously once yearly</option>
                          <option value="inhale one spray daily">inhale one spray daily</option>
                          <option value="infuse intravenously every three weeks">infuse intravenously every three weeks</option>
                          <option value="inhale two puffs daily">inhale two puffs daily</option>
                          <option value="inhale two puffs twice a day">inhale two puffs twice a day</option>
                          <option value="inhale one puff every six hours as needed">inhale one puff every six hours as needed</option>
                          <option value="inject one dose daily">inject one dose daily</option>
                          <option value="inject one dose weekly">inject one dose weekly</option>
                          <option value="inject as directed">inject as directed</option>
                          <option value="inject twice daily before meals">inject twice daily before meals</option>
                          <option value="inject three times daily 30 min before meals">inject three times daily 30 min before meals</option>
                        </Field>
                      </FormControl>
                    </Grid>
                  

                  
                    <Grid item xs={6}>
                      <FormControl  fullWidth>
                      <Field
                        fullWidth
                        component={TextField}
                        multiline
                        rowsMax={3}
                        name="notes"
                        label="Notes"
                        value={notes}
                        onChange={
                          e => {
                            setHelperTextPrescription('')
                            setErrorPrescription(false)
                            setNotes(e.target.value)
                            setFinalData({ ...finalData, addDrugDetails: { daysSupply, dispenseQuantity, directionForUse, tierException, siteOfAdministration, notes} })
                          }
                        }
                      />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormHelperText style={{textAlign: "center", marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold"}}>{helperTextPrescription}</FormHelperText>
                </FormControl>
              </Paper>

            {/* </Form> */}
          </Formik>

          <Formik
            initialValues={{
              providersPhoneNo: "",
              // default value -> finalData.providersData.addresses[0].telephone_number || "",
              providersFaxNo: ""
              // default value -> finalData.providersData.addresses[0].fax_number || ""
            }}
          >
            <Paper className={classes.additionalDetailsPaper} >
              <label className={classes.labelDesign}>
                Update Provider's Phone and/or Fax
              </label>
              <Grid
                container
                direction="row"
                spacing={4}
                className={classes.gridContainer}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Field
                    name="providersPhoneNo"
                    value={finalData.providersData ? finalData.providersData.addresses[0].telephone_number : ''}
                    component={TextField}
                    label="PHONE NO:"
                    onChange={ event => {
                      const {value} = event.target
                      setFinalData({
                        ...finalData,
                        providersData: {
                          ...finalData.providersData,
                          addresses: [
                            ...finalData.providersData.addresses,
                            (finalData.providersData.addresses[0].telephone_number =
                              value)
                          ]
                        }
                      })
                      setStep2Description(
                        `provider: ${finalData.providersData.basic.first_name} ${finalData.providersData.basic.last_name} - ${finalData.providersData.number} - Fax: ${finalData.providersData.addresses[0].fax_number} - Phone: ${finalData.providersData.addresses[0].telephone_number}`
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="providersFaxNo"
                    component={TextField}
                    value={finalData.providersData ? finalData.providersData.addresses[0].fax_number : ''}
                    label="FAX No:"
                    onChange={ event => {
                      const {value} = event.target
                      setFinalData({
                        ...finalData,
                        providersData: {
                          ...finalData.providersData,
                          addresses: [
                            ...finalData.providersData.addresses,
                            (finalData.providersData.addresses[0].fax_number =
                              value)
                          ]
                        }
                      })
                      setStep2Description(
                        `provider: ${finalData.providersData.basic.first_name} ${finalData.providersData.basic.last_name} - ${finalData.providersData.number} - Fax: ${finalData.providersData.addresses[0].fax_number} - Phone: ${finalData.providersData.addresses[0].telephone_number}`
                      )
                    }}
                  />
                </Grid>

                {/* <Grid item xs={3}>
                  <Button variant="contained" type="submit">
                    SUBMIT
                  </Button>
                </Grid> */}
              </Grid>
            </Paper>
          </Formik>
          <br />
          <Formik>
            <Paper className={classes.additionalDetailsPaper} >
              <Grid
                    container
                    direction="row"
                    spacing={4}
                    className={classes.gridContainer}
                    justify="center"
              >
                <Grid item xs={5}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{marginRight: '100px'}}
                    className={classes.button}
                    onClick={() => setStep(3)}
                  >
                     BACK
                  </Button>
                </Grid>
                <Grid item xs={7}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={handleData}
                  >
                    SUBMIT PA/Appeal
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Formik>


        {/* <div style={{textAlign: "center"}}>
          <Button
            variant="outlined"
            color="primary"
            style={{marginRight: '100px'}}
            className={classes.button}
            onClick={() => setStep(3)}
          >
            BACK
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleData}
          >
            SUBMIT PA/Appeal
          </Button>
        </div> */}

        <div>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>STATUS of {finalData.reqtype}:</DialogTitle>
            <DialogContent>
              <Typography>
                {msg.code == 200 && (
                  <div style={{ color: "green" }}>
                    PA has been created, successfully with Case Id - {caseID}
                  </div>
                )}
                {msg.msg != "Success" && (
                  <div style={{ color: "red" }}>{msg.msg}</div>
                )}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="text" disableElevation onClick={handleClose}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    </div>
  )
}



export default RadioButtonsGroup