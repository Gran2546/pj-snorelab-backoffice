import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";
export interface UserState {
  user_id: number
  firstname: string
  lastname: string
  username: string
  email: string
  created_at: string
  balance: string
  currency: string
  last_action?: string
  last_action_time?: string
}


const User = () => {
  const [state, setState] = useState<UserState[]>([])
  const location = useLocation()

  useEffect(() => {
    reloadService()
  }, [location.search])

 async  function reloadService() {
   const results = await getData<UserState[]>('/user/users') 

   setState(results)
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Search />
      <Table
        column={[
          {
            name: "#",
            key: "user_id",
            order: null,
            width: 60,
          },
          {
            name: "ชื่อ - นามสกุล",
            key: "fullname",
            order: null,
            width: 192,
          },
          {
            name: "อีเมลล์",
            key: "email",
            order: null,
            width: 192,
          },
          {
            name: "สมัครเมื่อ",
            key: "created_at",
            order: null,
            width: 192,
          }
        ]}
        data={state}
      />
      <Pagination />
    </div>
  );
};

export default User;
