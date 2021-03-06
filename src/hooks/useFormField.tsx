import { useState, useCallback, ChangeEvent } from 'react'

const useFormField = (initialValue: string = "") => {

  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string)
  }, [])

  const reset = () => setValue('')

  return ({
    value,
    onChange,
    reset
  })
}

export default useFormField