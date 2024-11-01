import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";

type AdminState = {
  user_id: number
  firstname: string
  lastname: string
  email: string
  username: string
  created_at: string
  role_name: string
  fullname: string
  status: string
}

const Admins = () => {
  const [state, setState] = useState<AdminState[]>([])
  const location = useLocation()

  useEffect(() => {
    reloadService()
  }, [location.search])
  
 async  function reloadService() {
   const results = await getData<AdminState[]>('/admin/admins') 

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
            name: "สิทธิ์การใช้งาน",
            key: "role_name",
            order: null,
            width: 192,
          },
          {
            name: "สถานะ",
            key: "status",
            order: null,
            width: 192,
          },
          {
            name: "สร้างเมื่อ",
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

export default Admins;
