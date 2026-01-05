"use client"

import { DisplayError } from "@/components/common/error"
import { useNursePapers } from "../_helpers/hooks"
import { IMAGES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

type Props = {
  nurseId: number
}

export const NursePapersCards = ({ nurseId }: Props) => {
  const { nursePapers, nursePapersError, isNursePapersError, isNursePapersLoading, isNursePapersRefetching } = useNursePapers(nurseId)

  if (isNursePapersLoading) return <div>Loading...</div>
  if (isNursePapersError) return <DisplayError error={nursePapersError} />
  if (!nursePapers) return <p>No papers found.</p>

  return (
    <div className='divide-y'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='py-4'>
          <a target='_blank' href={nursePapers.nationalIdFront} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            National ID Front <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          <img className='w-[450px] h-[200px] rounded-md object-cover shadow-sm' src={nursePapers.nationalIdFront || IMAGES.papers} />
        </div>
        <div className='py-4'>
          <a target='_blank' href={nursePapers.nationalIdBack} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            National ID Back <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          <img className='w-[450px] h-[200px] rounded-md object-cover shadow-sm' src={nursePapers.nationalIdBack || IMAGES.papers} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='py-4'>
          <a target='_blank' href={nursePapers.nusringLicenseFront} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            Nusring License Front <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          <img className='w-[450px] h-[200px] rounded-md object-cover shadow-sm' src={nursePapers.nusringLicenseFront || IMAGES.papers} />
        </div>

        <div className='py-4'>
          <a target='_blank' href={nursePapers.nusringLicenseBack} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            Nusring License Back <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          <img className='w-[450px] h-[200px] rounded-md object-cover shadow-sm' src={nursePapers.nusringLicenseBack || IMAGES.papers} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='py-4'>
          <a target='_blank' href={nursePapers.graduationCertificate} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            Graduation Certificate <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          <img className='w-[450px] h-[200px] rounded-md object-cover shadow-sm' src={nursePapers.graduationCertificate || IMAGES.papers} />
        </div>

        <div className='py-4 flex flex-col gap-2'>
          <a target='_blank' href={nursePapers.cv} className='text-xl font-semibold hover:underline hover:text-blue-500'>
            CV <span className='text-gray-500 text-sm'>(Click to expand)</span>
          </a>
          {!nursePapers.cv ? (
            <p className='text-sm text-gray-500'>No CV uploaded</p>
          ) : (
            <a href={nursePapers.cv}>
              <Button icon={DownloadIcon} variant='success'>
                Download
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
