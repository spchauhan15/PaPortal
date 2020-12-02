import AppTemplate from "../components/AppTemplate"
import { useContext } from "react"
import { Testcontext } from "./_app"
import XYZ from "./membersearchform"

const Home = props => {
  const { name, finalData } = useContext(Testcontext)
  return (
    <div style={{ marginTop: "100px" }}>
     <h1 style={{textAlign:'center',color:'black'}}>WELCOME to PA Portal !</h1>
     <br />
     <br />
     <br />
     <h3 style={{textAlign:'center',color:'black'}}>This application allows you to submit Prior Authorization as well as Appeal cases</h3>
    </div>
  )
}

export default Home