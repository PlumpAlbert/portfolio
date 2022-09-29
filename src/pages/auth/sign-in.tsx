import { getCsrfToken } from "next-auth/react"
import { GetServerSideProps, NextPage } from "next"
import React from "react"

interface IProps {
  csrfToken?: string
}

const SignIn: NextPage<IProps> = ({ csrfToken }) => {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <label>
        API key
        <input name="apiKey" type="text" />
      </label>

      <button type="submit">Sign in</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SignIn
