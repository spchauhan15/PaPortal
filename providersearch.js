import ifetch from "isomorphic-unfetch"

export default async (req, res) => {
  const url = `https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&country_code=US&first_name=${req.body.first_name}&last_name=${req.body.last_name}&state=${req.body.state}&city=&postal_code=&number=${req.body.npi}`

  const returnprovidersearch = await ifetch(url)
  const responseprovidersearch = await returnprovidersearch.json()
  return res.status(200).json(responseprovidersearch)
}