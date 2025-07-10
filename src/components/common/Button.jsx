import React from 'react'

const Button = ({className,primary,children, ...props}) => {
  return (
    <button {...props} className={`px-7 disabled:opacity-60 max-xs:py-2  hover:bg-opacity-90 py-3 text-center rounded-md ${className || ''} ${primary?'bg-primary':'bg-black'} text-white`}>{children}</button>
  )
}

export default Button