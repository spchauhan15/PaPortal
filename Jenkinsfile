#!/usr/bin/env groovy

@Library("com.optum.jenkins.pipeline.library@master") _

pipeline {
  agent none
  environment {
    AZURE_CREDENTIALS_ID = "PaPortal-SPE"
    DEPLOY_BRANCH = 'master'
    AZURECLI_VERSION = '2.10.1'
  }
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage ('Deploy to dev') {
      agent {
        label 'docker-terraform-agent'
      }
      steps {
        glAzureLogin(env.AZURE_CREDENTIALS_ID) {
          command "npm install && npm run build"
          command "zip -qq -r paportal.zip ."
          command "az webapp deployment source config-zip --resource-group orx_paportal_dev --name optumrx-paportal-dev-kfo62s --src paportal.zip"
        }
      }
    }
  }
}

