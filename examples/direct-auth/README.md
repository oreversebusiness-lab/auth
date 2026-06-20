# Direct Auth - Project Integration Example

This directory contains example code for integrating a project with the OreVerse SSO Direct Auth flow.

## Flow

1. User clicks "Sign in with OreVerse" button on your project
2. Redirected to OreVerse SSO for sign-in (or auto-redirects if already logged in)
3. SSO generates a JWT token and redirects back to your project's `/api/dauth?token=jwt`
4. Your project verifies the JWT and redirects to the SSO's user-data endpoint
5. SSO POSTs user info (`name`, `email`, `image`) to your project's `/api/login/dauth`
6. Your project creates a local session and redirects the user

## Files

- `button.html` - The sign-in button to place on your project
- `app/api/dauth/route.ts` - Receives JWT, verifies it, triggers the user data flow
- `app/api/login/dauth/route.ts` - Receives user data from SSO, creates local session

## Setup

1. Copy `app/api/dauth/route.ts` and `app/api/login/dauth/route.ts` into your Next.js project
2. Add `BETTER_AUTH_SECRET` to your `.env` (must match the SSO server's secret)
3. Place the button from `button.html` on your sign-in page
4. Replace `https://auth.oreverse.com` with your actual SSO URL
