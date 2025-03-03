# sauron
Realtime error monitoring (AWS)

## Creating a Slack Bot

This section provides basic instructions on how to create a Slack bot that can write to channels. For more detailed information and advanced features, refer to the official Slack API documentation.

**1. Create a Slack App**

* Go to the Slack API website: [https://api.slack.com/](https://api.slack.com/)
* Click "Create New App"
* Choose "From scratch"
* Give your app a name (e.g., "Sauron") and select your workspace
* Click "Create App"

**2. Enable Bot User**

* In your app's settings, go to "Features" -> "Bots"
* Click "Add a Bot User"
* Give your bot a display name and optionally customise its icon
* Click "Add Bot User"

**3. Install the App to Your Workspace**

* Go to "Features" -> "OAuth & Permissions"
* Under "Scopes" -> "Bot Token Scopes", add the following permissions:
    * `chat:write` (to send messages)
* Click "Install to Workspace" and authorise the app

**4. Get Your Bot Token**

* After installation, you'll receive a "Bot User OAuth Token"
* Keep this token secure, as it's the key to controlling your bot
* The token will later need to be set in the .env file as SLACK_CLIENT_TOKEN [Go to Populate with values](#populate-env) 

# Deployment Instructions

This project requires Node.js version 20 and environment variables to be set for successful deployment. Follow these steps:

## 1. Ensure Node.js Version 20 (Using NVM)

1.  **Install NVM (Node Version Manager):** If you don't have NVM installed, follow the instructions on the NVM GitHub repository: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

2.  **Use Node.js version 20:** Navigate to the project directory in your terminal and use NVM to switch to Node.js version 20:

    ```bash
    nvm use 20
    ```

    * If you don't have Node.js 20 installed, NVM will automatically download and install it.

3.  **Verify Node.js version:** Confirm that you are using the correct Node.js version:

    ```bash
    node -v
    ```

    The output should be `v20.x.x` (where `x` represents the minor and patch versions).

## 2. Install Dependencies (Using pnpm)

1.  **Install pnpm:** if you do not have pnpm installed, install it using npm. `npm install -g pnpm`
2.  **Install dependencies:** Use pnpm to install the project dependencies:

    ```bash
    pnpm install
    ```

## 3. Create and Configure `.env` File

1.  **Copy the sample:** Duplicate the `.env.sample` file and rename it to `.env`.

    ```bash
    cp .env.sample .env
    ```

2.  **Populate with values:** Open the `.env` file in a text editor and replace the placeholder values with your actual environment variables. <a name="populate-env"></a> 

    ```bash
    # Example .env content:
    SERVICE_NAME=sauron
    ENV=dev
    REGION=eu-west-2
    ACCOUNT_ID=123456789000
    SAURON_DOMAIN_NAME=my.sauron.domain.com
    SLACK_CLIENT_TOKEN=xobx...
    # ... other variables ...
    ```

## 4. Deploy the Service

1.  **Deploy using Serverless Framework:** Use the following command to deploy your service. This command will load the environment variables from your `.env` file before executing `sls deploy`.

    ```bash
    npx dotenv -- sls deploy
    ```

    **Explanation:**

    * `npx dotenv --`: This part loads the environment variables from your `.env` file into the current shell environment.
    * `sls deploy`: This is the Serverless Framework command that deploys your service to your configured cloud provider.

## Troubleshooting

* **Deployment fails with missing environment variables:** Double-check that your `.env` file contains the correct variable names and values.
* **Security:** Never commit sensitive information to version control. Keep your `.env.sample` file secure.

## Custom Domains
Using the `serverless-domain-manager` plugin, we can automatically generate API Gateway mappings
using the `serverless create_domain` command

e.g. (`serverless create_domain`)

The only prerequisites to deploying a new api subdomain are to request a
certificate from the AWS Certificate Manager and to add the Route 53 CNAME
record to the certificate (there's a button for it in the certificate).
