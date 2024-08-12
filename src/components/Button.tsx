import React from 'react'
import { ButtonProps } from '../utils/types'

// interface ButtonProps {
//   text: string
// //   func?: (workout: string) => void
//   func?: () => void
// }

const Button: React.FC<ButtonProps> = ({ text, func }) => {
  return (
    <button 
        onClick={func}
        className='px-8 py-4 mx-auto rounded-md border-blue-400 border-[2px] bg-slate-950 border-solid blueShadow duration-200'
    >
        <p>{text}</p>
    </button>
  )
}

export default Button
