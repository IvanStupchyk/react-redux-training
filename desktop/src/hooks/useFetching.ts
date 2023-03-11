import React from 'react'
import { AppThunkType } from '../store/store'

const useFetching = <OPT>(callback: (options?: any) => AppThunkType, actionCallback?: () => void) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  const fetching = async (options?: OPT) => {
    try {
      setIsLoading(true)
      await callback(options)

      if (actionCallback) {
        actionCallback()
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error] as const
}

export default useFetching
