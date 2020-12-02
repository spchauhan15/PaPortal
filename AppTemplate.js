import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

const AppTemplate = props => (
  <div>
    <Head>
      <title>PA Portal</title>
    </Head>
    <Header />
    <div>{props.children}</div>
    <Footer />
  </div>
)

export default AppTemplate
