import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"

export const Testcontext = React.createContext()
function MyApp({ Component, pageProps }) {
  const [name, setName] = useState("hi")
  const [finalData, setFinalData] = useState({})
  const [currentStep, setStep] = useState(1)
  const [step1Description, setStep1Description] = useState('Member Search')
  const [step2Description, setStep2Description] = useState('Provider Search')
  const [step3Description, setStep3Description] = useState('Drug Search')
  const [step4Description, setStep4Description] = useState('Create PA')
  function submitData() {}
  return (
    <>
      <Head>
        <title>PA Portal</title>
      </Head>
      <Header />
      <Testcontext.Provider
        value={{
          step1Description,
          setStep1Description,
          step2Description,
          setStep2Description,
          step3Description,
          setStep3Description,
          step4Description,
          setStep4Description,
          name,
          currentStep,
          setStep,
          finalData,
          setFinalData
        }}
      >
        <Component {...pageProps} />
      </Testcontext.Provider>
      <Footer />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//
//   return { ...appProps }
// }

export default MyApp