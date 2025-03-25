# sauron
**Sauron Ecosystem: An Integrated Real-Time Error Management Solution**

The Sauron ecosystem provides a comprehensive error management solution for serverless applications, consisting of three key components:

1.  **Sauron Microservice (Backend):**
    * This central service acts as the error ingestion and notification hub.
    * It receives error logs from your serverless applications via the Sauron SDK.
    * It processes these logs and pushes critical errors to designated Slack channels, providing real-time alerts.
    * It also provides the API that the error suppression web app uses.

2.  **Error Suppression Web App (Frontend):**
    * This React-based web application provides a user-friendly interface for managing error suppression rules.
    * Users can create and configure rules to filter out specific errors before they are sent to Slack.
    * This helps reduce noise and alert fatigue by preventing known or non-critical errors from triggering notifications.
    * This app communicates with the Sauron Microservice.

3.  **Sauron SDK (`@serverless-studio/sauron-sdk`):**
    * This Node.js package is installed within your serverless microservices.
    * It integrates seamlessly with your existing serverless functions, capturing error logs and forwarding them to the Sauron microservice.
    * This ensures that all errors are reliably captured and processed by the Sauron system.

**Workflow:**

1.  Your serverless applications, instrumented with the Sauron SDK, generate error logs.
2.  The Sauron SDK forwards these logs to the Sauron microservice.
3.  The Sauron microservice receives the logs and checks them against any active error suppression rules defined in the web application.
4.  If an error matches a suppression rule, it is ignored.
5.  If an error is not suppressed, the Sauron microservice sends a notification to the configured Slack channel.
6.  Users can then use the web application to review errors and create new suppression rules as needed.

This integrated system provides a powerful and efficient way to manage errors in your serverless environment, ensuring you are alerted to critical issues while minimising distractions from non-essential ones.

# Prerequisites

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
* The token will later need to be set in the .env file as SLACK_CLIENT_TOKEN [go to steps](#populate-env) 

# 1. Deployment Instructions (barebones)

This project requires Node.js version 20 and environment variables to be set for successful deployment. You can either use Follow these steps:

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

## 3. Create and Configure `.env` File <a name="populate-env"></a>

1.  **Copy the sample:** Duplicate the `.env.sample` file and rename it to `.env`.

    ```bash
    cp apps/backend/.env.sample apps/backend/.env
    ```

2.  **Populate with values:** Open the `apps/backend/.env` file in a text editor and replace the placeholder values with your actual environment variables. 

    ```bash
    # Example .env content:
    SERVICE_NAME=sauron
    ENV=dev
    REGION=eu-west-2
    ACCOUNT_ID=123456789000
    SAURON_DOMAIN_NAME=my.sauron.domain.com
    SLACK_CLIENT_TOKEN=xobx...
    COMMA_SEPARATED_API_GATEWAY_ALLOWED_IPS=1.1.1.1
    # ... other variables ...
    ```

    * By declaring `COMMA_SEPARATED_API_GATEWAY_ALLOWED_IPS`, APIs that allow you to manage error suppression rules will be deployed and only allow calls from the specified IP addresses.

## 4. Deploy the Service <a name="deploy-microservice"></a>

1.  **Deploy using Serverless Framework:** Use the following command to deploy your service. This command will load the environment variables from your `.env` and `apps/backend/.env` files before executing `sls deploy`.

    ```bash
    npx nx deploy backend
    ```

    **Explanation:**

    * `npx nx`: All interactions with the codebase happen through NX, the monorepo tool.
    * `deploy`: The definition of this command can be found in the `apps/backend/package.json` file. This runs the Serverless Framework command that deploys your service to your configured cloud provider.

## Troubleshooting

* **Deployment fails with missing environment variables:** Double-check that your `apps/backend/.env` file contains the correct variable names and values.
* **Security:** Never commit sensitive information to version control. Keep your `.env.sample` files secure.

## Custom Domains
Using the `serverless-domain-manager` plugin, we can automatically generate API Gateway mappings
using the `npx nx create-domain backend` command

The only prerequisites to deploying a new api subdomain are to request a
certificate from the AWS Certificate Manager and to add the Route 53 CNAME
record to the certificate (there's a button for it in the certificate).

# 2. Error Suppression Management (Local Development)

The dashboard provides a mechanism to manage and ignore errors that you've identified as safe to disregard. This feature prevents these errors from triggering alerts and filling your slack channel, allowing you to prioritise critical issues.
To access and use the Sauron dashboard for managing error suppressions, follow these steps:

## 1.  **Deploy the Backend Service with Allowed IP Addresses:**

1.  **Set the ENV variable:**

    In `apps/backend/.env` specify the `COMMA_SEPARATED_API_GATEWAY_ALLOWED_IPS` environment variable. This variable should contain a comma-separated list of CIDR blocks representing the IP addresses that are allowed to access the sauron service APIs. [see steps](#populate-env)

    ```bash
    COMMA_SEPARATED_API_GATEWAY_ALLOWED_IPS=1.1.1.1
    ```

2. **Deploy the sauron microservice**

    Deploy your backend service [see steps](#deploy-microservice). Copy paste the base API URL.

     ```bash
    npx nx serve web
    ```
**Important Notes:**

* The `COMMA_SEPARATED_API_GATEWAY_ALLOWED_IPS` setting is crucial for security. Ensure that only trusted IP addresses are included in the list.

## 2.  **Set up the error supression management web app**

1.  **Copy the sample:** Duplicate the `.env.sample` file and rename it to `.env`.

    ```bash
    cp apps/web/.env.sample apps/web/.env
    ```

2.  **Populate with values:** Open the `apps/web/.env` file in a text editor and assign the previously copied sauron API url to `VITE_SAURON_API_URL` . 

    ```bash
    # Example .env content:
    VITE_SAURON_API_URL=https://xxxxxxxxxx.execute-api.eu-west-2.amazonaws.com/dev
    # ... other variables ...
    ```

## 3.  **Run the Web App Locally**
For now, there is no deployment pipeline set up for the web app. You may set up your pipeline and deploy it wherever you wish.

1.  **Run the Web Dashboard Locally:**

    * Start the development server:

        ```bash
        npx nx serve web
        ```

    * Open your web browser and go to the URL shown in the console (usually `http://localhost:4200`).

2.  **Manage Error Suppressions:**

    To create an error suppression rule in the Sauron web app, you'll need to provide the following information:

    * **Service Name:** The name of the serverless service where the error originates.
    * **Function Name:** The name of the specific function within the service that is generating the error.
    * **Matchers:** These are the criteria used to identify the errors you want to suppress. If the matcher text is present in the error, the error will not be sent to Slack.
    * **Reason (Optional):** A brief explanation of why you're suppressing this error. This helps with documentation and future maintenance.
