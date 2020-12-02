# PAPORTAL
This is a repository for PA Portal

## Jenkins Build

This repository builds and deploys the app service code to an existing app service. The app service is deployed by the terraform code defined here: https://github.optum.com/ORxPAPortal/PaPortal-Teraform/blob/master/appservice/main.tf.

The deploy command is fairly simple:

```
az webapp deployment source config-zip --resource-group orx_paportal_dev --name optumrx-paportal-dev-kfo62s --src paportal.zip
```

This targets the dev environment app service specifically. We run `npm install && npm run build` and then zip the resulting directory so the build does not have to take place on Azure. One key discovery is that for these app services, the `ROOT_DIRECTORY` app setting must be set to the home directory of the app service application. One other important point is to set the `PORT` environment variable so that the app service knows what port to connect on.

