import React from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Button from "@material-ui/core/Button"
import Link from "next/link"

const useStyles = makeStyles(theme => ({
  menuButton: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  }
}))

const Header = props => {
  const { history } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const isMinimised = useMediaQuery(theme.breakpoints.down("sm"))

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenulick = pageURL => {
    history.push(pageURL)
  }
  const handleButtonClick = pageURL => {
    history.push(pageURL)
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      {/* color="transparent" */}
      <AppBar position="fixed" color="opaque">
        <Toolbar>
          <img
            src="/optumlogo.jpg"
            alt="Optum Inc.,"
            width="100"
            height="40"
            style={{
              paddingBottom: "16px",
              marginLeft: "4px",
              marginRight: "10px"
            }}
          />

          <div className={classes.menuButton}>
            {isMinimised ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem>
                    <Link href="/">HOME</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/FinalForm">CREATE PA</Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className={classes.headerOptions}>
                <Button variant="text" disableElevation>
                  <Link href="/" as="/home">
                    <a>HOME</a>
                  </Link>
                </Button>
                <Button variant="text" disableElevation>
                  <Link href="/FinalForm" as="/PASubmissionForm">
                    <a>Submit PA/Appeal</a>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <style jsx>{`
        a {
          text-decoration: none
          color: black
        }
      `}</style>
    </div>
  )
}

export default Header