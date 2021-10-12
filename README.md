# Serverless example

## Setup

This project uses the [express](https://expressjs.com/) web framework, and deploys it to AWS using
[serverless](https://www.serverless.com/). In order to run commands locally and run the server
locally, you need to install dependencies:

```
yarn install
```

You can then run the server in localdev with:

```
yarn dev
```

## Deploy to AWS

Before you can deploy to AWS, you need to configure your AWS credentials. **This only needs to be
done once per-project**. It's recommended to use [aws-vault](https://github.com/99designs/aws-vault)
to securely store AWS credentials.

To generate a new set of credentials:

1. go to the AWS console (https://console.aws.amazon.com)
2. in the top right, click on your name
3. click on My Security Credentials
4. click on Access keys
5. click Create New Access Key
6. copy your access key id and secret access key. if using aws-vault, follow the instructions there
   to store them. otherwise you'll need follow the instructions
   [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-methods)
   to store your credentials locally

If using `aws-vault`, deploy with the following command:

```
aws-vault exec <your-profile> --no-session yarn sls deploy
```

The first deployment is special and requires the `--no-session` flag, but subsequent deploys can
just be run without it:

```
aws-vault exec <your-profile> yarn sls deploy
```

Otherwise, if not using `aws-vault`, you can just deploy with:

```
yarn sls deploy
```

After the deployment runs successfully, it will output the endpoint that the server is reachable at,
for example:

```bash
aws-vault exec ryangilbert -- yarn sls deploy
yarn run v1.22.5
$ sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Service files not changed. Skipping deployment...
Service Information
service: aws-node-express-api-project
stage: dev
region: us-east-1
stack: aws-node-express-api-project-dev
resources: 11
api keys:
  None
endpoints:
  ANY - https://64ymr0eu40.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-project-dev-api
layers:
  None

Monitor Express APIs by route with the Serverless Dashboard: run "serverless"
✨  Done in 8.79s.
```

## References

- serverless docs: https://www.serverless.com/
- aws-vault: https://github.com/99designs/aws-vault/
- aws cli: https://aws.amazon.com/cli/
- expressjs: https://expressjs.com/
