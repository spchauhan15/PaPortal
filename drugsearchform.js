import React from "react"
import { useState, useContext } from "react"
import {
  Paper,
  PaperActions,
  PaperContent,
  Typography,
  Button,
  MenuItem,
  FormControl,
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
import FormControlLabel from "@material-ui/core/FormControlLabel"
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
import { createMuiTheme } from "@material-ui/core/styles"

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
    width: "100%"
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
    marginTop: "5%",
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
    //marginLeft: "auto",
    //marginRight: "auto"
  },

  tableHeader: {
    backgroundColor: theme.palette.light
  },
  button: {
    marginBottom: "2%"
  }
}))

const FormAfterSearch = () => {
  const classes = useStyles()
  const [drugsData, setDrugData] = useState([])
  const [drugDetails, setDrugDetails] = useState()
  const { setStep, finalData, setFinalData, submitData, step3Description, setStep3Description } = useContext(
    Testcontext
  )

  const handleRowClick = x => {
    //console.log(x)
    setDrugDetails(x)
    setFinalData({ ...finalData, drugsData: x })
    setStep3Description(`drug: ${x.productNameAbbreviation} - NDC: ${x.productId} - GPI: ${x.gpi}`)

    setStep(4)
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
      {/* <Paper className={classes.root} variant="outlined">
        <PaperContent> */}

      <Typography
        className={classes.title}
        color="textSecondary"
        gutterBottom
        style={{ textAlign: "center", marginTop: "2%" }}
      >
        <h3>Drug Search</h3>
      </Typography>

      <Formik
        initialValues={{
          NDC: "",
          GPI: "",
          drugName: "",
          strength: ""
        }}
        onSubmit={async values => {
          //alert(JSON.stringify(values))
          //   const url = "/api/token"
          //   const returns = await isfetch(url)
          //   const demo1 = await returns.json()
          //   console.log(demo1)
          // console.log(typeof values.carrierId)
          //setVal(values)
          // e.preventDefault()
          const url = "/api/drugsearch"
          const bodystring = {
            // carrierId: values.carrierId,
            genericName: values.drugName,
            productId: values.NDC,
            gpi: values.GPI,
            strength: values.strength
          }

          const config = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodystring)
          }
          const returns = await isfetch(url, config)
          const responsedrug = await returns.json()
          const { productSearchResponse } = responsedrug
          const { products } = productSearchResponse
          setDrugData(products)
        }}
        // validationSchema={validationSchema}
      >

      {props => (        
        <Form>
          {" "}
          <Paper className={classes.formPaper}>
            <Grid
              container
              direction="row"
              spacing={3}
              className={classes.gridContainer}
              justify="center"
              alignItems="center"
              margin-bottom="10"
            >
              <Grid item xs={3}>
                <Field name="NDC" component={TextField} label="NDC" />
              </Grid>
              <Grid item xs={3}>
                <Field name="GPI" component={TextField} label="GPI" />
              </Grid>
              <Grid item xs={3}>
                <Field
                  name="drugName"
                  component={TextField}
                  label="Drug Name"
                />
              </Grid>
              <Grid item xs={3}>
                <Field name="strength" component={TextField} label="Strength" />
              </Grid>
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
                disabled={
                  !(
                    props.values.NDC ||
                    props.values.GPI ||
                    props.values.drugName 
                  )
                }
              >
                SEARCH
              </Button>
            </Grid>
          </Paper>
        </Form>
      )}
      </Formik>

      <div>
        {drugsData.length !== 0 ? (
          <div>
            <TableContainer component={Paper} className={classes.tablePaper}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="a dense table"
                size="small"
              >
                {drugsData.length !== 0 ? (
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Drug Name
                      </TableCell>
                      <TableCell className={classes.tableHeader}>
                        Drug Strength
                      </TableCell>

                      <TableCell className={classes.tableHeader}>GPI</TableCell>
                      <TableCell className={classes.tableHeader}>NDC</TableCell>
                    </TableRow>
                  </TableHead>
                ) : (
                  "loading"
                )}

                {drugsData.map((home, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(home)}
                    hover={true}
                  >
                    <TableCell>{home.productNameExtension}</TableCell>
                    <TableCell>{home.strength + " mg"}</TableCell>

                    <TableCell>{home.gpi}</TableCell>
                    <TableCell>{home.productId}</TableCell>

                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </div>
        ) : (
          ""
        )}


      </div>
      <Button onClick={() => setStep(2)}>Back</Button>
    </div>
  )
}

export default FormAfterSearch