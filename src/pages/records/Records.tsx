import React, { ChangeEvent, useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";
import { useModals } from "../../context/Modal";
import Input from "../../components/Input";
import UploadMp3 from "../../components/UploadMP3";
import Button from "../../components/Button";

type RecordState = {
  id: number
  name: string
  user_id: number
  record_data: RecordData
  created_at: string
}

type RecordData = {
  file: string
}

const Records = () => {
  const [state, setState] = useState<RecordState[]>([])
  const [submit, setIsSubmit] = useState(false)
  const { pushModal, popModal } = useModals();
  const location = useLocation()
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    reloadService()
  }, [location.search])

  useEffect(() => {
    if (!submit || !file || !name) {
      return
    }

    uploadMp3()
  }, [submit, name, file])

  async function reloadService() {
    const results = await getData<RecordState[]>('/record/records')

    setState(results.map((item) => ({ ...item, ...item.record_data })))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  function handleRightButtonClick() {
    openModal()
  }

  // Optionally handle the file upload
  const handleSelectFile = (thisFile: File | null) => {
    if (!thisFile) {
      return
    }

    setFile(thisFile)
  };

  async function uploadMp3() {
    const formData = new FormData();
    formData.append('file', file as never);
    formData.append('name', name);

    try {
      const response = await fetch('http://localhost:3007/record/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const data = await response.json();
      console.log('Upload response:', data);
      closeModal();
      openSuccessModal();
      reloadService();
      setIsSubmit(false)
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  }

  const openModal = () => {
    setFile(null)
    setName('')

    pushModal(
      <div className="w-full flex flex-col items-center justify-center gap-[16px] px-[16px] md:px-0">
        <div className="font-semibold py-[12px]">เพิ่มเพลง</div>
        <Input label={'ชื่อเพลง'} handleChange={handleChange} />
        <UploadMp3 label={'ไฟล์เพลง'} handleSelectFile={handleSelectFile} />
        <div className="flex w-full md:max-w-[275px] gap-[8px]" >
          <Button onClick={hideModal} text="บันทึก" />
          <Button variant={'secondary'} onClick={closeModal} text="ภายหลัง" />
        </div>
      </div>
    );
  };

  const hideModal = () => {
    popModal()
    setIsSubmit(true)
  }

  const openSuccessModal = () => {
    pushModal(
      <div className="w-full flex flex-col items-center justify-center gap-[16px] px-[16px] md:px-0">
        <div className="font-semibold py-[12px]">บันทึกสำเร็จ</div>
        <div className="flex w-full md:max-w-[275px] gap-[8px]" >
          <Button variant={'secondary'} onClick={closeModal} text="ปิด" />
        </div>
      </div>
    );
  };

  const closeModal = () => {
    popModal();
  };

  const handleDelete = async (id: number) => {
    await fetch('http://localhost:3007/record/delete/' + id, {
      method: 'delete',
    });
    reloadService()
  }
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Search onRightButtonClick={handleRightButtonClick} rightButtonLabel="เพิ่มเพลง" />
      <Table
        isDelete
        column={[
          {
            name: "ชื่อ",
            key: "name",
            order: null,
            width: 192,
          },
          {
            name: "ไฟล์เพลง",
            key: "mp3_path",
            order: null,
            width: 492,
          },
          {
            name: "สร้างเมื่อ",
            key: "created_at",
            order: null,
            width: 192,
          },
        ]}
        data={state}
        onDelete={(item) => handleDelete(item.id)}
      />
      <Pagination />
    </div>
  );
};

export default Records;
