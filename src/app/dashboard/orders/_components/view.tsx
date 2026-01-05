import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, UserIcon, CreditCardIcon, ClockIcon, PhoneIcon } from "lucide-react"
import { Order } from "@/types/models"
import { diffForHumans, formatToEGP } from "@/lib/helpers"
import { getOrderStatusColor } from "@/lib/badges"

type Props = { order: Order }

export const ViewOrderCard = ({ order }: Props) => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-balance'>Order #{order.id}</h1>
          <p className='text-muted-foreground mt-1'>{order.title}</p>
        </div>
        <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Order Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ClockIcon className='h-5 w-5' />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Description</label>
                  <p className='text-pretty'>{order.description}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Employment Type</label>
                  <p>{order.employmentType}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Service Type</label>
                  <p>{order.type}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Payment Type</label>
                  <p>{order.paymentType}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Gender Preference</label>
                  <p>{order.gender}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Patient Age</label>
                  <p>{order.age} years old</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Scheduled Date</label>
                  <p className='flex items-center gap-1'>
                    <CalendarIcon className='h-4 w-4' />
                    {order.date ? diffForHumans(order.date) : "N/A"}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Location</label>
                  <p className='flex items-center gap-1'>
                    <MapPinIcon className='h-4 w-4' />
                    {order.latitude.toFixed(4)}, {order.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {order.additionalInformation && (
                <>
                  <Separator />
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Additional Information</label>
                    <p className='text-pretty mt-1'>{order.additionalInformation}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Service Information */}
          {order.specificService && (
            <Card>
              <CardHeader>
                <CardTitle>Service & Illness Type</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <h4 className='font-semibold mb-2'>Main Service</h4>
                    <div className='space-y-2'>
                      <p className='font-medium'>{order.service.name}</p>
                      <p className='text-sm text-muted-foreground'>{order.service.description}</p>
                      <p className='text-sm'>Hourly Rate: {formatToEGP(`${order.service.hourlyFees}`)}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-semibold mb-2'>Specific Service</h4>
                    <div className='space-y-2'>
                      <p className='font-medium'>{order.specificService.name}</p>
                      <p className='text-sm text-muted-foreground'>{order.specificService.description}</p>
                      <p className='text-sm'>Price: {formatToEGP(`${order.specificService.price}`)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className='font-semibold mb-2'>Illness Type</h4>
                  <p className='font-medium'>{order.illnessType.name}</p>
                  <p className='text-sm text-muted-foreground'>{order.illnessType.description}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {order.payment ? (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCardIcon className='h-5 w-5' />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Payment Status</span>
                  <Badge className={getOrderStatusColor(order.payment.status)}>{order.payment.status}</Badge>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Payment Method</label>
                    <p>{order.payment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Card Brand</label>
                    <p>{order.payment.cardBrand ?? "N/A"}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Total Hours</label>
                    <p>{order.payment.totalHours} hours</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Service Amount</label>
                    <p className='text-green-600 font-semibold text-lg'>{formatToEGP(`${order.payment.serviceAmount}`)}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Total Amount</label>
                    <p className='font-semibold text-lg text-green-600'>{formatToEGP(`${order.payment.totalAmount}`)}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Transaction ID</label>
                    <p className='font-mono text-sm'>{order.payment.kashierTranscationId ?? "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className='text-orange-600'>No Payment Available for this order till now.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UserIcon className='h-5 w-5' />
                Patient
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <p className='font-medium'>{order.user?.username}</p>
                <p className='text-sm text-muted-foreground'>{order.user?.email}</p>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <PhoneIcon className='h-4 w-4' />
                {order.user.phoneNumber}
              </div>
            </CardContent>
          </Card>

          {/* Nurse Information */}
          {order.nurse ? (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <UserIcon className='h-5 w-5' />
                  Assigned Nurse
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <p className='font-medium'>{order.nurse?.username}</p>
                  <p className='text-sm text-muted-foreground'>{order.nurse?.email}</p>
                </div>
                <div className='flex items-center gap-1 text-sm'>
                  <PhoneIcon className='h-4 w-4' />
                  {order.nurse?.phoneNumber}
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className='text-red-500'>No Nurse Assigned or accepted this order</p>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <label className='text-sm font-medium text-muted-foreground'>Created</label>
                <p className='text-sm'>{diffForHumans(order.createdAt)}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-muted-foreground'>Last Updated</label>
                <p className='text-sm'>{diffForHumans(order.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
