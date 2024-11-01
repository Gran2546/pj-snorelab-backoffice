import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
 import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";

type RoleState = {
  id: number
  role_name: string
}

const Roles = () => {
  const [state, setState] = useState<RoleState[]>([]) 
  const location = useLocation()

  useEffect(() => {
    reloadService()
  }, [location.search])

  async function reloadService() {
    const results = await getData<RoleState[]>('/role/roles') 

    setState(results)
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Table
        column={[
          {
            name: "ชื่อสิทธิ์",
            key: "id",
            order: null,
            width: 192,
          },
          {
            name: "การอนุมัติ",
            key: "role_name",
            order: null,
            width: 300  ,
          },
          {
            name: "สถานะ",  
            key: "role_name",
            order: null,
            width: 500,
          },
        ]}
        data={state}
      />
      <Pagination />
    </div>
  );
};

export default Roles;
