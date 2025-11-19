# Auth.js and Ory Integration Example

This repository demonstrates how to integrate Auth.js (formerly NextAuth.js) with Ory for authentication and identity management. The example shows a complete setup for handling authentication flows while leveraging the powerful features of both platforms.

## Features

- Complete OAuth/OIDC integration between Auth.js and Ory
- JWT session handling with custom claims
- Profile data synchronization
- Middleware-based route protection
- Configurable storage options (Vercel KV or in-memory for development)

## Configuration

The integration uses Ory as an OIDC provider with Auth.js, passing essential identity information through the authentication flow:

- Custom session properties for Ory's session ID (`sid`)
- ID token persistence across the authentication flow
- PKCE and state parameter validation for enhanced security

## Environment Variables

To run this example, you'll need to configure the following environment variables:

```
ORY_SDK_URL=https://your-ory-project.projects.oryapis.com
ORY_CLIENT_ID=your-client-id
ORY_CLIENT_SECRET=your-client-secret

AUTH_SECRET=your-auth-secret
AUTH_KV_REST_API_URL=your-vercel-kv-url (optional)
AUTH_KV_REST_API_TOKEN=your-vercel-kv-token (optional)
AUTH_DEBUG=true (optional)
```

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Configure your environment variables
4. Run the development server with `npm run dev`

The example includes a fully configured authentication system with login, logout, and session handling. Visit `/auth/signin` to begin the authentication flow.

## More Information

- [Auth.js Documentation](https://authjs.dev)
- [Ory Documentation](https://www.ory.sh/docs)