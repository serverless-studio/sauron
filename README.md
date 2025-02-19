# sauron
Realtime error monitoring (AWS)

## Installation

Depending on your preferred package manager, follow the instructions below to deploy your project.

### Running Locally
Run locally using `sls offline`

### Project structure
The project code base is mainly located within the `src` folder. This folder is divided in:

## Custom Domains
Using the `serverless-domain-manager` plugin, we can automatically generate API Gateway mappings
using the `serverless create_domain` command

e.g. (`serverless create_domain`)

The only prerequisites to deploying a new api subdomain are to request a
certificate from the AWS Certificate Manager and to add the Route 53 CNAME
record to the certificate (there's a button for it in the certificate).
