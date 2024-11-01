import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";

type HistoryState = {
  history_id: number
  user_id: number
  action: string
  amount: number
  created_at: string
  firstname: string
  lastname: string
  fullname: string
  username: string
  email: string
}

const History = () => {
  const [state, setState] = useState<HistoryState[]>([])
  const location = useLocation()

  useEffect(() => {
    reloadService()
  }, [location.search])

  async function reloadService() {
    const results = await getData<HistoryState[]>('/history/histories') 

    setState(results)
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Search />
      <Table
        column={[
          {
            name: "#",
            key: "history_id",
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
            name: "คะแนน",
            key: "score",
            order: null,
            width: 192,
          },
          {
            name: "การใช้งาน",
            key: "action",
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

export default History;
