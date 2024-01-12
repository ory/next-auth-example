import { Configuration, FrontendApi, OAuth2Api, OidcApi } from "@ory/client"

const config = new Configuration({
  basePath: process.env.ORY_SDK_URL,
  baseOptions: {},
})

export const frontend = new FrontendApi(config)
export const oidc = new OidcApi(config)
export const oauth2 = new OAuth2Api(config)
