import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

export default function Logout() { 
    useEffect(() => {
        removeToken()
    },[])

    function removeToken() {
        Cookies.remove('authToken')
        Cookies.remove('token')

        window.open('/','_self')
    }

  return (
    <div>
    </div>
  )
}
