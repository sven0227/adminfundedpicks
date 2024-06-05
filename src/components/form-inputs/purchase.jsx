import Loader from '../loader'
import FormControl from '@core/components/form-control'
import Error from '../error'
import { useGetAllPurchasesQuery } from '@/redux-store/api/purchase'

const SelectPurchaseControl = ({ name = 'purchase', label = 'Purchase', control, errors, userId }) => {
  const { data: purchasesData = [], isLoading, isError } = useGetAllPurchasesQuery()

  if (isError) {
    return <Error />
  }
  if (isLoading) {
    return <Loader />
  }
  return (
    <FormControl
      control={control}
      errors={errors}
      inputType='select'
      label={label}
      name={name}
      options={
        purchasesData
          ? purchasesData
              .filter(({ user: { id } }) => id === userId)
              .map(({ id, product }) => ({
                value: id,
                label: product
              }))
          : []
      }
      placeholder='Select User'
    />
  )
}

export default SelectPurchaseControl
