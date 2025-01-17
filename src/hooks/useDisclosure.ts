import React from 'react'

type DisclouserType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useDisclosure = (initial: boolean = false): DisclouserType => {
  const [isOpen, setIsOpen] = React.useState(initial)

  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])
  const toggle = React.useCallback(() => setIsOpen(state => !state), [])

  return {isOpen, open, close, toggle}
}