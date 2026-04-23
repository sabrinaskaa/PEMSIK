import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList } from "@/Data/Dummy";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setMahasiswa(mahasiswaList);
  }, []);

  const storeMahasiswa = (newData) => {
    setMahasiswa((prev) => [...prev, newData]);
  };

  const updateMahasiswa = (nim, newData) => {
    setMahasiswa((prev) =>
      prev.map((mhs) => (mhs.nim === nim ? { ...mhs, ...newData } : mhs)),
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.nim || !formData.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (selectedMahasiswa) {
      confirmUpdate(() => {
        updateMahasiswa(selectedMahasiswa.nim, formData);
        toastSuccess("Data berhasil diperbarui");
        setModalOpen(false);
        setSelectedMahasiswa(null);
      });
    } else {
      const exists = mahasiswa.find((mhs) => mhs.nim === formData.nim);

      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      storeMahasiswa(formData);
      toastSuccess("Data berhasil ditambahkan");
      setModalOpen(false);
      setSelectedMahasiswa(null);
    }
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>

          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
        />
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;
