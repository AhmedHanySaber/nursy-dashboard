import { UserCounts } from "@/types/models"

type Props = {
  counts: UserCounts
}

export const UserCountsCard = ({ counts }: Props) => {
  return (
    <div className='bg-white h-fit p-4 rounded-md shadow-sm'>
      <h3 className='text-xl font-medium border-b mb-4'>User Statistics</h3>
      <ul className='space-y-2 divide-y'>
        <li className='flex items-center justify-between py-1'>
          <span>Total Chats</span>
          <span className='font-medium'>{counts.totalChatsCount}</span>
        </li>
        <li className='flex items-center justify-between py-1'>
          <span>Total Messages</span>
          <span className='font-medium'>{counts.totalMessagesCount}</span>
        </li>
        <li className='flex items-center justify-between flex-wrap py-1'>
          <span>Total Orders</span>
          {counts.ordersCount.length === 0 && <span className='font-medium'>0</span>}
          <span className='flex gap-2 items-center'>
            {counts.ordersCount.map((item, idx) => (
              <span key={`order-count-${idx}`} className='border p-1 px-2 text-xs rounded-3xl bg-gray-100'>
                {item.status}: <b>{item.count}</b>
              </span>
            ))}
          </span>
        </li>
        <li className='flex items-center justify-between py-1'>
          <span>Total Payments</span>
          {counts.paymentsCount.length === 0 && <span className='font-medium'>0</span>}
          <span className='flex gap-2 items-center'>
            {counts.paymentsCount.map((item, idx) => (
              <span key={`order-count-${idx}`} className='border p-1 px-2 text-xs rounded-3xl bg-gray-100'>
                {item.status}: <b>{item.count}</b>
              </span>
            ))}
          </span>
        </li>
      </ul>
    </div>
  )
}
