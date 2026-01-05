import Link from "next/link"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HomeIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const DashboardNavbar = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-white border-b xl:pl-68 pl-4'>
      <h1 className='text-lg font-semibold first-letter:text-blue-600'>Nursy Dashboard</h1>

      <ul className='flex gap-4 items-center'>
        <li>
          <Link href='' className='hover:underline hover:text-blue-500 text-md flex items-center gap-2'>
            <HomeIcon className='size-4' />
            Home
          </Link>
        </li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' icon={UserIcon} size='icon' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-64'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </nav>
  )
}
