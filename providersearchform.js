import React from "react"
import { useState, useContext } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  //FormCo<TableRowol,
  InputLabel,
  Grid
} from "@material-ui/core"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from "formik-material-ui"
import { makeStyles } from "@material-ui/core/styles"
//import Box from "@material-ui/core/Box"
import * as Yup from "yup"
//import FormCo<TableRowolLabel from "@material-ui/core/FormCo<TableRowolLabel"
import FormLabel from "@material-ui/core/FormLabel"
import isfetch from "isomorphic-unfetch"
//import AppTemplate from "../components/AppTemplate"
import Link from "next/link"
import Footer from "../components/Footer"
import { Testcontext } from "./_app"

//import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { createMuiTheme } from "@material-ui/core/styles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from '@material-ui/core/FormHelperText'

//style
// const useStyles = makeStyles({

// })
const theme = createMuiTheme({
  palette: {
    light: "orange"
  }
})

//style
// const useStyles = makeStyles({

// })

const useStyles = makeStyles(the => ({
  root: {
    // maxWidth: 875,
    // marginLeft: 200,
    // marginTop: 20
    width: "100%",
    display: ""
  },

  title: {
    fontSize: 14
  },
  sel: {
    width: 200
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formPaper: {
    //backgroundColor: theme.palette.background.paper,
    //border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    // height: 300,
    // overflow: "auto",
    width: "70%",
    marginLeft: "auto",
    marginRight: "5%",
    marginTop: "1%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginBottom: "10px"
  },

  tablePaper: {
    // backgroundColor: theme.palette.background.paper,
    //border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    height: 275,
    overflow: "auto",
    width: "70%",
    marginLeft: "auto",
    marginRight: "5%",
    marginTop: "4%"
    //marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 650
  },
  tableHeader: {
    backgroundColor: theme.palette.light
  }
}))

const FormAfterSearch = () => {
  const classes = useStyles()
  const [providerData, setProviderData] = useState([])
  const [providerDetails, setProviderDetails] = useState()
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = React.useState('')

  const {
    setStep,
    finalData,
    setFinalData,
    submitData,
    step2Description,
    setStep2Description
  } = useContext(Testcontext)
  const [errResp, setErrResp] = useState("")

  const handleRowClick = x => {
    console.log(x)
    setProviderDetails(x)
    setFinalData({ ...finalData, providersData: x })
    setStep2Description(`provider: ${x.basic.first_name} ${x.basic.last_name} - ${x.number} - Fax: ${x.addresses[0].fax_number ? x.addresses[0].fax_number : 'unknown' } - Phone: ${x.addresses[0].telephone_number ? x.addresses[0].telephone_number : 'unknown'}`)
    setStep(3)
  }

  return (
    <div>
      <Typography
        className={classes.title}
        color="textSecondary"
        gutterBottom
        style={{ textAlign: "center", marginTop: "2%" }}
      >
        {/* <h3>Provider Search</h3> */}
      </Typography>
      <Formik
        initialValues={{
          providerFirstName: "",
          providerLastName: "",
          NPI: "",
          state: ""
        }}
        onSubmit={async values => {
            //alert(JSON.<TableRowingify(values))
            //   const url = "/api/token"
            //   const returns = await isfetch(url)
            //   const demo1 = await returns.json()
            //   console.log(demo1)
            // console.log(typeof values.carrierId)
            //setVal(values)
            // e.preventDefault()

            if(values.NPI || values.providerFirstName || values.providerLastName ){

              setHelperText(' ')
              setError(false)
            const url = "/api/providersearch"
            const bodystring = {
              // carrierId: values.carrierId,
              first_name: values.providerFirstName,
              last_name: values.providerLastName,
              npi: values.NPI,
              state: values.state
            }

            const config = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bodystring)
            }
            const returns = await isfetch(url, config)
            const responseprovider  = await returns.json()
            console.log(responseprovider )
            console.log(responseprovider .result_count)
            console.log(responseprovider .results)
            //   const { productSearchResponse } = responseprovider 
            //   const { products } = productSearchResponse
            //   setDrugData(products)
            // const { results } = responseprovider 
            // console.log(results)
            // setProviderData(results)

            if (responseprovider .results !== undefined) {
              const { results } = responseprovider 
              //console.log(results)
              setProviderData(results)
              setErrResp("")
            } 
            else {
              setProviderData([])
              setErrResp("Record(s) not found. Try modifying search criteria.")
            } 
          } else {
            setHelperText('Please enter search criteria.')
            setError(true)
          }
        }
      }
    
        validationSchema={Yup.object({
          // NPI: Yup.number().test(
          //   "len",
          //   "Must be exactly 10 digit number",
          //   val => val.toString().length === 10
          // ),
          providerFirstName: Yup.string(),
          providerLastName: Yup.string()
        })}
      >
        {props => (
          <Form>
            <Paper className={classes.formPaper}>
            <FormControl component="fieldset" error={error} style={{display: "flex"}}>
              <FormLabel component="legend" style={{textAlign: "center",fontWeight: "bold"}}>Provider Search</FormLabel>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.gridContainer}
                  justify="center"
                  alignItems="center"
                >
                  <Grid container item xs={12} justify="center">
                    <Field
                      name="NPI"
                      component={TextField}
                      label="Provider NPI"
                      // onChange={
                      //   e => {
                      //     setHelperText(' ')
                      //     setError(false)
                      //   }
                      // }
                    />
                  </Grid>
                </Grid>

                {/* {props.values.NPI === "" ? ( */}
                  <>
                    <Typography align="center" marginTop="10px">
                      OR
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      spacing={3}
                      className={classes.gridContainer}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={4}>
                        <Field
                          name="providerFirstName"
                          component={TextField}
                          label="First Name"
                          // onChange={
                          //   e => {
                          //     setHelperText(' ')
                          //     setError(false)
                          //   }
                          // }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name="providerLastName"
                          component={TextField}
                          label="Last Name"
                          // onChange={
                          //   e => {
                          //     setHelperText(' ')
                          //     setError(false)
                          //   }
                          // }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field name="state" component={TextField} label="State" />
                      </Grid>
                    </Grid>
                  </>
                {/* // ) : (
                //   ""
                // )} */}
                <div>
                  <br></br>
                </div>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  //marginTop="10px"
                >
                <Button
                  className={classes.gridContainer}
                  variant="contained"
                  type="submit"
                  disabled={
                    !(
                      props.values.NPI ||
                      props.values.providerFirstName ||
                      props.values.providerLastName 
                    )
                  }
                >
                  Search
                </Button>
              </Grid>
              <FormHelperText style={{textAlign: "center", marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold"}}>{helperText}</FormHelperText>
            </FormControl>
            </Paper>
          </Form>
        )}
      </Formik>

      <div>
        {providerData.length !== 0 ? (
          <div>
            <TableContainer component={Paper} className={classes.tablePaper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                {providerData.length !== 0 ? (
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>First name</TableCell>
                      <TableCell className={classes.tableHeader}>Last Name</TableCell>
                      <TableCell className={classes.tableHeader}>NPI</TableCell>
                      <TableCell className={classes.tableHeader}>Phone Number</TableCell>
                      <TableCell className={classes.tableHeader}>Address</TableCell>
                      <TableCell className={classes.tableHeader}>Fax</TableCell>
                    </TableRow>
                  </TableHead>
                ) : (
                  ""
                )}
                {providerData.map((home, index) => (
                  <TableRow
                    key={index}
                    // style={{ background: "grey", color: "orange", margin: "0" }}
                    onClick={() => handleRowClick(home)}
                    hover={true}
                  >
                    {/* <TableCell>{index}<<TableCell> */}
                    <TableCell>{home.basic.first_name}</TableCell>
                    <TableCell>{home.basic.last_name}</TableCell>
                    <TableCell>{home.number}</TableCell>
                    <TableCell>{home.addresses[0].telephone_number}</TableCell>
                    <TableCell>{home.addresses[0].address_1}</TableCell>
                    <TableCell>{home.addresses[0].fax_number}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>

            {/* <Button
              disabled={!finalData.providersData}
              onClick={() => setStep(3)}
            >
              Next
            </Button> */}
          </div>
        ) : (
          <Paper className={classes.formPaper}>
            <Typography align="center">{errResp}</Typography>{" "}
          </Paper>
        )}
      </div>
      <Button onClick={() => setStep(1)}>Back</Button>
    </div>
  )
}

export default FormAfterSearch