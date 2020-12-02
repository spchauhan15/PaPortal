import ifetch from "isomorphic-unfetch"

export default async (req, res) => {
  //console.log(req)
  const tokenauthurl = process.env.tokenauthurldrugsearch

  const bodystr = {
    client_id: process.env.client_iddrugsearch,
    client_secret: process.env.client_secretdrugsearch,
    grant_type: process.env.grant_typedrugsearch
  }

  const configToken = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodystr)
  }

  const returnToken = await ifetch(tokenauthurl, configToken)
  const responseToken = await returnToken.json()
  //console.log(JSON.stringify(responseToken))
  const tempToken = responseToken.access_token

  const drugsearchurl = process.env.drugsearchurl


  const bodystring = {
    searchInputMetaData: {
      rxClaimSystemParms: {
        PBMUserID: process.env.PBMUserID
        //"GFFO_USER"
      },
      consumerAppId: process.env.consumerAppId, 
      consumerAppType: process.env.consumerAppType, 
      consumerInstanceId: null,
      consumerType: process.env.consumerType,
      externalCorrelationId: null,
      rXClaimInstanceId: "BOOK1",
      pagination: {
        maxResults: process.env.drugMaxResults,
        maxResultsIndicator: true
      }
    },
    memberKey: "",
    productName: req.body.genericName,
    productNameAbbreviation: "",
    genericName: "",
    productIdQualifier: "",
    productId: req.body.productId,
    gpi: req.body.gpi,
    strength: req.body.strength,
    manufacturerId: null,
    dosageFormCode: null,
    excludeParms: [
      {
        excludeField: "UnitDoseUnitUse",
        excludeFieldVal: "U"
      },
      {
        excludeField: "UnitDoseUnitUse",
        excludeFieldVal: "X"
      },
      {
        excludeField: "ActiveInd",
        excludeFieldVal: "N"
      }
    ]
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tempToken
    },
    body: JSON.stringify(bodystring)
  }
  const returndrugsearch = await ifetch(drugsearchurl, config)
  const responsedrugsearch = await returndrugsearch.json()
  //console.log(JSON.stringify(responsedrugsearch))
  return res.status(200).json(responsedrugsearch)

}