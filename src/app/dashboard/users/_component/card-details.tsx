import { diffForHumans, formatDate } from "@/lib/helpers"
import { User } from "@/types/models"

type Props = {
  user: User
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className='bg-white h-fit p-4 rounded-md shadow-sm'>
      <h3 className='text-xl font-medium border-b mb-4'>User Details</h3>
      <ul className='space-y-2 divide-y'>
        <li className='flex items-center justify-between'>
          <span>ID</span>
          <span className='font-medium'>#{user.id}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Username</span>
          <span className='font-medium'>{user.username}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>E-mail</span>
          <span className='font-medium'>{user.email}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Phone Number</span>
          <span className='font-medium'>{user.phoneNumber}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Gender</span>
          <span className='font-medium'>{user.gender}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Birth Date</span>
          <span className='font-medium'>{user.birthDate ? formatDate(user.birthDate) : "N/A"}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Type</span>
          <span className='font-medium'>{user.type}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Created At</span>
          <span className='font-medium'>{diffForHumans(user.createdAt)}</span>
        </li>
        <li className='flex items-center justify-between'>
          <span>Last Update</span>
          <span className='font-medium'>{diffForHumans(user.updatedAt)}</span>
        </li>
      </ul>
    </div>
  )
}
