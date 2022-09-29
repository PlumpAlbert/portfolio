import { signIn, useSession } from "next-auth/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useCallback, useEffect } from "react"

const SignIn: NextPage = () => {
  const router = useRouter()
  const { error } = router.query
  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
  }, [router, status])

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      const apiKey: string = e.currentTarget.apiKey.value
      signIn("credentials", { apiKey, redirect: true, callbackUrl: "/" })
    },
    []
  )

  if (status === "loading") return null

  return (
    <div className="m-auto max-w-lg p-6 rounded shadow bg-gray-800 border border-gray-700">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block mb-2 text-sm font-medium">API key</label>
          <input
            className={`block input ${
              error && "border !bg-red-500/10 border-red-700/80"
            }`}
            name="apiKey"
            autoComplete="current-password"
            type="text"
          />
          <span className="block mt-1 px-3 text-red-500 text-sm first-letter:capitalize">
            {error && "Wrong API key"}
          </span>
        </div>

        <button className="button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignIn
