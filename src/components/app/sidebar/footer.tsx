"use client"

import { useLogout } from "@/hooks/auth/use-logout"
import { CogIcon, LogOut } from "lucide-react"

export const SidebarFooter = () => {
  const logout = useLogout()

  return (
    <div className='p-2 border-t mt-auto'>
      <ul className='space-y-1'>
        <li>
          <button className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10 cursor-pointer transition-all'>
            <CogIcon className='h-5 w-5' />
            Settings
          </button>
        </li>
        <li>
          <button onClick={() => logout.mutate()} className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10 cursor-pointer transition-all'>
            <LogOut className='h-5 w-5' />
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
