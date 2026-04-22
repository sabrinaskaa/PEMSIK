import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList } from "@/Data/Dummy";

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
    if (selectedMahasiswa) {
      const confirmUpdate = window.confirm("Yakin ingin mengupdate data ini?");
      if (!confirmUpdate) return;

      updateMahasiswa(selectedMahasiswa.nim, formData);
    } else {
      const exists = mahasiswa.find((mhs) => mhs.nim === formData.nim);
      if (exists) {
        alert("NIM harus unique");
        return;
      }

      storeMahasiswa(formData);
    }

    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const handleDelete = (nim) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    deleteMahasiswa(nim);
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
