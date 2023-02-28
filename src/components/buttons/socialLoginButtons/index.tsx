import React from 'react'
import './styles.sass'

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export const SocialLoginButtons = () => {
  return (
    <div className="loginWith">
        <button className="loginWithGoogle"><FcGoogle/></button>
        <button className="loginWithFacebook"><FaFacebookF/></button>
    </div>
  )
}
