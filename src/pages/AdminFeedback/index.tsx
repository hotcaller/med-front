import { Card } from '@/components/ui/card'
import { IconAffiliateFilled } from '@tabler/icons-react'
import ReviewList from './modules/ReviewList/ReviewList'

const index = () => {
  return (
    <div className="mx-auto pt-6">
      <Card className='overflow-hidden'>
        <div className="px-6 py-4 bg-muted flex items-center gap-4 m-0">
          <IconAffiliateFilled size={24}/>
          <h1 className="text-xl font-bold text-gray-900">
            Техническая поддержка
          </h1>
        </div>


        <ReviewList />
      </Card>
    </div>

  )
}

export default index