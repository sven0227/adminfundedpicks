import { useGetAllUsersQuery } from '@/redux-store/api/user'
import Loader from '../loader'
import FormControl from '@core/components/form-control'
import Error from '../error'

const SelectUserControl = ({ name = 'user', label = 'User', control, errors }) => {
  const { data: usersData = [], isLoading, isError } = useGetAllUsersQuery()

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
      options={usersData.map(({ id, username }) => ({
        value: id,
        label: username
      }))}
      placeholder='Select User'
    />
  )
}

export default SelectUserControl
