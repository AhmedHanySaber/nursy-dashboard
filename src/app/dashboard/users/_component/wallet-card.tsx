import { formatToEGP } from "@/lib/helpers"
import { UserWallet } from "@/types/models"

type Props = {
  wallet: UserWallet
}

export const UserWalletCard = ({ wallet }: Props) => {
  return (
    <div className='bg-white text-center divide-x p-4 border border-gray-50 shadow-sm rounded-md grid grid-cols-2 '>
      <div>
        <p className='text-2xl font-bold'>Balance</p>
        <p className='text-lg font-extrabold text-green-600'>{formatToEGP(wallet.balance?.toString())}</p>
      </div>
      <div>
        <p className='text-2xl font-bold'>Debit</p>
        <p className='text-lg font-extrabold text-red-500'>-{formatToEGP(wallet.debit?.toString())}</p>
      </div>
    </div>
  )
}
