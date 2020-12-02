import ifetch from "isomorphic-unfetch"
export default async (req, res) => {
  //console.log(req)
  const tokenauthurl = process.env.tokenauthurlmembersearch

  const bodystr = {
    client_id: process.env.client_idmemebersearch,	
    client_secret: process.env.client_secretmemebersearch,	
    grant_type: process.env.grant_typememebersearch
  }

  const configToken  = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodystr)
  }

  const returnToken  = await ifetch(tokenauthurl, configToken)
  const responseToken = await returnToken.json()
  console.log(JSON.stringify(responseToken ))
  //   const x = JSON.stringify(responseToken )
  const tempToken = responseToken .access_token
  //console.log(tempToken)

  const membersearchurl = process.env.membersearchurl
  //const token = ""
  const bodystring = {
    searchInputMetaData: {
      consumerAppId: process.env.consumerAppId,
      consumerAppType: process.env.consumerAppType,
      externalCorrelationId: process.env.externalCorrelationId,
      internalCorrelationId: process.env.internalCorrelationId,
      rXClaimInstanceId: ""
    },
    carrierId: req.body.carrierId,
    accountId: "",
    memberId: req.body.memberId,
    memberIdSearchOperator: "E",
    firstNameSearchOperator: "E",
    lastNameSearchOperator: "E",
    groupId: "",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    effectiveDate: "",
    status: "A"
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tempToken
    },
    body: JSON.stringify(bodystring)
  }
  const returnmembersearch  = await ifetch(membersearchurl, config)
  const responsemembersearch  = await returnmembersearch .json()
  //console.log("I AM LEGEND BY WILL SMITH")
  console.log(config.headers.Authorization)
  //console.log(JSON.stringify(responsemembersearch))
  // console.log("##################### RESULT ###########################")
  return res.status(200).json(responsemembersearch )
}