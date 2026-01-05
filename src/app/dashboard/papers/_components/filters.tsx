import { SearchBar } from "@/components/common/search"

type Props = {}

export const PendingNursesTableFilters = ({}: Props) => {
  return (
    <div className='flex gap-2 w-full my-4'>
      <SearchBar forceParam='type=Patient' className='my-0 w-full' />
    </div>
  )
}
