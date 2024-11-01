import React, { ChangeEvent, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { postData } from "../../lib/api";
import Cookies from "js-cookie";

export interface LoginResponse {
  user: User
  token: string
}

export interface User {
  id: number
  username: string
  email: string
}

const Home = () => {

  const [state, setstate] = useState({
    email: '',
    password: ''
  })

  const handleValue = (key: keyof typeof state) => (event: ChangeEvent<HTMLInputElement>) => {
    setstate({ ...state, [key]: event.target.value })
  }

  async function handleClick() {
    try {
      const results = await postData<LoginResponse, typeof state>('/admin/login', state)
      
      Cookies.set('authToken', results.token)

      window.open('/users','_self')
    } catch (error) {

    }
  }

  return <div className="flex flex-col gap-[16px] p-[16px] w-full items-center justify-center h-[100vh]">
    <Input label="อีเมลล์" text={state.email} handleChange={handleValue('email')} />
    <Input type="password" label="รหัสผ่าน" text={state.password} handleChange={handleValue('password')} />
    <Button text={"เข้าสู่ระบบ"} onClick={handleClick} />
  </div>;
};

export default Home;
