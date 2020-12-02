import React from "react"
import { useState, useContext } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider
} from "@material-ui/core"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from "formik-material-ui"
import { makeStyles, withStyles } from "@material-ui/core/styles"
//import Box from "@material-ui/core/Box"
import * as Yup from "yup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import isfetch from "isomorphic-unfetch"
import AppTemplate from "../components/AppTemplate"
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
import Moment from 'moment'
//import * as Yup from "yup"
//import { KeyboardDatePicker } from "@material-ui/pickers"

//style
// const useStyles = makeStyles({

// })
const theme = createMuiTheme({
  palette: {
    light: "orange"
  }
})

const useStyles = makeStyles(the => ({
  root: {
    // maxWidth: 875,
    // marginLeft: 200,
    // marginTop: 20
    width: "100%"
  },
  button: {
    padding: 2
  },

  title: {
    fontSize: 14
  },
  sel: {
    width: 200
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginBottom: "10px"
  },
  // modal: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
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
    marginBottom: 0
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
    marginTop: "3%"
    //marginBottom: theme.spacing.unit * 1
  },

  table: {
    // margin: "auto",
    fontFamily: "Trebuchet MS",
    borderCollapse: "collapse",
    width: "100%",
    height: "1px"
    // marginLeft: "auto",
    // marginRight: "auto"
  },

  tableHeader: {
    backgroundColor: theme.palette.light
  }
}))

const FormAfterSearch = () => {
  const classes = useStyles()
  const [memberData, setMemberData] = useState([])
  const [memberDetails, setMemberDetails] = useState(null)
  const [val, setVal] = useState(null)
  //const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const {
    name,
    finalData,
    setFinalData,
    setStep,
    step1Description,
    setStep1Description
  } = useContext(Testcontext)
  const [errResp, setErrResp] = useState("")

  const handleRowClick = x => {
    console.log(x)
    setMemberDetails(x)
    setFinalData({ ...finalData, membersData: x })
    setStep1Description(`member: ${x.fName} ${x.lName} - ID: ${x.memberId} - DOB: ${!x.dob ? 'unknown' : Moment(Moment(x.dob).format('YYYY-MM-DD')).format('MM/DD/YYYY')}`)
    setStep(2)
  }

  const handleHide = x => {
    console.log(x)
  }

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }
  // const validationSchema = Yup.object({
  //   firstname: Yup.string().required("Need to enter this field")
  // })
  return (
    // <AppTemplate>
    // <AppTemplate>
    <div>
      {/* <Card className={classes.root} variant="outlined">
        <CardContent> */}

      {/* <Typography
        className={classes.title}
        color="textSecondary"
        gutterBottom
        style={{ textAlign: "center", marginTop: "-4%" }}
      >
        <h4>Member Search</h4>
      </Typography> */}
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          memberId: "",
          dob: ""
        }}
        onSubmit={async values => {
          const url = "/api/membersearch"
          const bodystring = {
            // carrierId: values.carrierId,
            memberId: values.memberId,
            firstName: values.firstname.toUpperCase(),
            lastName: values.lastname.toUpperCase(),
            dateOfBirth: values.dob
          }

          const config = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodystring)
          }
          const returns = await isfetch(url, config)
          const responsemember  = await returns.json()
          console.log(responsemember )

          if (responsemember .response !== null) {
            const { response } = responsemember 
            //console.log("hi")
            setMemberData(response.member)
            setErrResp("")
          } else {
            setMemberData([])
            setErrResp("No records found. Try modifing your criteria.")
          }
        }}

        // Yup.object().shape({
        //   memberId: Yup.string(),
        //   firstname: Yup.string().when("memberId", {
        //     is: memberId => {
        //       return memberId !== undefined && memberId.length > 0
        //     },
        //     then: Yup.string().required("enter either mem ID/rest"),
        //     otherwise: null
        //   })
      >
        {props => (
          <Form>
            <Paper className={classes.formPaper}>
              <FormLabel component="legend" style={{textAlign: "center",fontWeight: "bold"}}>Member Search</FormLabel>
             
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
                    name="memberId"
                    component={TextField}
                    label="Member ID"
                    //onChange={() => handleHide()}
                  />
                </Grid>
              </Grid>

              {props.values.memberId === "" ? (
                <>
                  {/* <Grid container spacing={0}>
                    <Grid item xs={10}> */}
                  <Typography align="center" marginTop="10px">
                    OR
                  </Typography>
                  {/* 
                    </Grid> */}
                  {/* </Grid> */}
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
                        name="firstname"
                        component={TextField}
                        label="Firstname"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="lastname"
                        component={TextField}
                        label="Lastname"
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Field
                        name="dob"
                        //type="date"
                        component={TextField}
                        label="Date of Birth"
                        placeholder="yyyymmdd"
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                ""
              )}
              {/* <>  <Grid container item xs={2} justify="center">
                  OR
                </Grid> */}
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
                      props.values.memberId ||
                      (props.values.firstname &&
                        props.values.lastname &&
                        props.values.dob)
                    )
                  }
                >
                  Search
                </Button>
              </Grid>
            </Paper>
          
          </Form>
        )}
      </Formik>

      <div>
        {memberData.length !== 0 ? (
          <div>
            <TableContainer component={Paper} className={classes.tablePaper}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="a dense table"
                size="small"
              >
                {memberData.length !== 0 ? (
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Member ID
                      </TableCell>
                      <TableCell className={classes.tableHeader}>
                        First Name
                      </TableCell>

                      <TableCell className={classes.tableHeader}>
                        Last Name
                      </TableCell>
                      <TableCell className={classes.tableHeader}>DOB</TableCell>
                      <TableCell className={classes.tableHeader}>
                        Gender
                      </TableCell>
                      <TableCell className={classes.tableHeader}>Zip</TableCell>
                      <TableCell className={classes.tableHeader}>
                        State
                      </TableCell>
                      {/* <TableCell>Details</TableCell> */}
                    </TableRow>
                  </TableHead>
                ) : (
                  "loading"
                )}

                {memberData.map((home, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(home)}
                    hover={true}
                  >
                    <TableCell>{home.memberId}</TableCell>
                    <TableCell>{home.fName}</TableCell>
                    <TableCell>{home.lName}</TableCell>
                    <TableCell>{!home.dob ? '' : Moment(Moment(home.dob).format('YYYY-MM-DD')).format('MM/DD/YYYY')}</TableCell>
                    <TableCell>{home.sex}</TableCell>
                    <TableCell>{home.zip}</TableCell>
                    <TableCell>{home.state}</TableCell>

                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Paper className={classes.formPaper}>
            <Typography align="center">{errResp}</Typography>{" "}
          </Paper>
        )}

      </div>
    </div>
  )
}

export default FormAfterSearch