import React from "react"

const Footer = () => (
  <>
    <footer>
      <small>&copy; 2020, Optum, Inc. All rights reserved.</small>
    </footer>
    <style jsx>{`
      footer {
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        background-color: black
        color: white
        text-align: center
      }
    `}</style>
  </>
)

export default Footer
