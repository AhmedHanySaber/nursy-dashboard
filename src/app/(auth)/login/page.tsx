import AppLogo from "@/components/common/logo"
import routes from "@/lib/routes"

import { LoginForm } from "./_components/login-form"

import { getCurrentAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getCurrentAdmin()
  if (user) return redirect(routes.home)

  return (
    <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='w-fit'>
            <AppLogo />
          </div>

          <div className='text-left space-y-2'>
            <h2 className='text-xl font-semibold text-gray-900'>Welcome Back</h2>
            <p className='text-sm text-gray-600'>
              Welcome back to <b>Nursy</b> dashboard where you can control your application.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
