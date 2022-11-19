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
      router.replace("/analytics/month")
    }
  }, [router, status])

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      const apiKey: string = e.currentTarget.apiKey.value
      signIn("credentials", {
        apiKey,
        redirect: true,
        callbackUrl: "/analytics/month",
      })
    },
    []
  )

  if (status === "loading") return null

  return (
    <div className="flex-1 flex mx-6">
      <div className="m-auto w-full max-w-lg p-6 rounded shadow-md bg-white border-neutral-200 dark:bg-modal-dark dark:border dark:border-gray-700">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block ml-3 mb-2 text-base font-medium">
              API key
            </label>
            <textarea
              className={`w-full block input font-mono resize-none text-base ${
                error && "border !bg-red-500/10 border-red-700/80"
              }`}
              name="apiKey"
              autoComplete="current-password"
              rows={6}
            />
            <span className="block mt-1 px-3 text-red-500 text-sm first-letter:capitalize">
              {error && "Wrong API key"}
            </span>
          </div>

          <button className="button text-base" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
