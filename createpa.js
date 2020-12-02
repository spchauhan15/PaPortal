import ifetch from "isomorphic-unfetch"
import { Testcontext } from "../_app"
import { useContext } from "react"

export default async (req, res) => {
  // const { finalData } = useContext(Testcontext)
  const {
    membersData,
    providersData,
    drugsData,
    reqtype,
    additionalDrugDetails
  } = req.body

  //console.log(drugsData.productId.trim(), "------->>>>>>>>> NDC value")
  //console.log(req)

  const tokenauthurlcreatepa = process.env.tokenauthurlcreatepa
  const bodystr = {
    client_id: process.env.client_idcreatepa,
    client_secret: process.env.client_secretcreatepa,
    grant_type: process.env.grant_typecreatepa
  }

  const configToken = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodystr)
  }

  const returnsToken = await ifetch(tokenauthurlcreatepa, configToken)
  const responseToken = await returnsToken.json()
  //console.log(JSON.stringify(responseToken))
  const tempToken = responseToken.access_token
  const createpaurl = process.env.createpaurl

  const bodystring = {
    RequestHeader: {
      Application: process.env.Application
      //"PAPortal"
    },

    Authentication: {
      UserName: process.env.PASUserName,
      //"PAPORTAL"
      Password: process.env.PASPassword
      //"UEFQTlBQd2QkMQ=="
    },

    RequestorInfo: {
      UserID: "testUser",
      ClientID: "BCBS",
      SupervisorName: "",
      Department: "",
      Priority: "",
      CallerType: "",
      Purpose: reqtype,
      CallerPhoneNumber: ""
    },
    MemberInfo: {
      MemberID: membersData.memberId,
      FirstName: membersData.fName,
      LastName: membersData.lName,
      DOB: membersData.dob,
      CarrierCode: membersData.carrCode,
      AccountCode: membersData.accCode,
      GroupCode: membersData.grpCode,
      PlanCode: membersData.planName,
      RxClaimInstanceIdentifier: membersData.instanceId
    },

    ProviderInfo: {
      ProviderID: providersData.number,
      FirstName: providersData.basic.first_name,
      LastName: providersData.basic.last_name,
      Address1: providersData.addresses[0].address_1,
      City: providersData.addresses[0].city,
      State: providersData.addresses[0].state,
      ZipCode: providersData.addresses[0].postal_code,
      //Phone: providersData.addresses[0].telephone_number
      Phone: providersData.addresses[0].telephone_number.replace(/-/g,'').replace(/ /g,'').replace(/\(/g,'').replace(/\)/g,''),
      Fax: providersData.addresses[0].fax_number.replace(/-/g,'').replace(/ /g,'').replace(/\(/g,'').replace(/\)/g,'')

      //here considering only first address & that's why the subscript [0]
    },

    MedicationInfo: {
      CompoundDrugIndicator: "",
      PAType: "",
      FormularyNotes: additionalDrugDetails.notes || "",
      DrugInfo: {
        NDC: drugsData.productId.trim(),
        GPI: drugsData.gpi.trim(),
        DrugName: drugsData.productNameExtension.trim(),
        Strength: drugsData.strength,
        FormularyStatus: ""
      },
      // AdditionalDrugDetails: {
      //   DaysSupply: "11",
      //   DispenseQuantity: "11",
      //   Dosage: "",
      //   DirectionForUse: "Take two pills",
      //   TierException: "Yes",
      //   SiteofAdministration: "Self Administered",
      //   StartDate: ""
      // }
      AdditionalDrugDetails: {
        DaysSupply: additionalDrugDetails.daysSupply || "11",
        DispenseQuantity: additionalDrugDetails.dispenseQuantity || "11",
        Dosage: "",
        DirectionForUse:
          additionalDrugDetails.directionForUse || "Take two pills",
        TierException: additionalDrugDetails.tierException || "Yes",
        SiteofAdministration:
          additionalDrugDetails.siteOfAdministration || "Self Administered",
        StartDate: ""
      }
    },
    AppealInfo: {
      DeniedCaseID: "PA-12345",
      ServiceType: "BA"
    },

    Notes: {
      Subject: "",
      Comments: ""
    }
  }

  const configCreatePA = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tempToken
    },
    body: JSON.stringify(bodystring)
  }

  console.log(JSON.stringify(bodystring))
  console.log(configCreatePA)
  
  const returnCreatePA = await ifetch(createpaurl, configCreatePA)
  const responseCreatePA = await returnCreatePA.json()
  //console.log(JSON.stringify(responseCreatePA))
  return res.status(200).json(responseCreatePA)
}