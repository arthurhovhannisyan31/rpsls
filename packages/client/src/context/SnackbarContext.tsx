import React, { useState, createContext, FC } from 'react'

import { AbstractContextContainerProps } from 'model/common'
import { SnackbarContextProps, SnackbarProps } from 'model/context/snackbar'

const snackbarInitState: SnackbarProps = {
  open: false,
  type: 'success',
  message: '',
}

const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarState: snackbarInitState,
  setSnackbarState: () => null,
})

const SnackbarContextContainer: FC<AbstractContextContainerProps> = ({
  children,
}) => {
  const [snackbarState, setSnackbarState] = useState(snackbarInitState)

  const handleChange = (props: Partial<SnackbarProps>): void => {
    setSnackbarState((state: SnackbarProps) => ({
      ...state,
      ...props,
    }))
  }

  const contextValue = {
    snackbarState,
    setSnackbarState: handleChange,
  }

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  )
}

export { SnackbarContextContainer as default, SnackbarContext }
