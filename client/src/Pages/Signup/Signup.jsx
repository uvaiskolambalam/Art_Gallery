import React from 'react'
import GradientBackground from '../../Components/GradientBackground/GradientBackground'
import SignupBox from '../../Components/SignupBox/SignupBox'
import './Signup.css'

const Signup = () => {
  return (
    <div className='Signup'>
        <GradientBackground/>
        <SignupBox/>
    </div>
  )
}

export default Signup