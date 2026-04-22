import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: true,
  });

  useEffect(() => {
    setMahasiswa(mahasiswaList);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === nim ? { ...mhs, ...newData } : mhs,
    );

    setMahasiswa(updated);
  };

  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  const openAddModal = () => {
    setForm({
      nim: "",
      nama: "",
      status: true,
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm({
      nim: mhs.nim,
      nama: mhs.nama,
      status: mhs.status,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (nim) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    deleteMahasiswa(nim);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      alert("Data kurang terisi");
      return;
    }

    if (isEdit) {
      const confirmUpdate = window.confirm("Yakin ingin mengupdate data ini?");
      if (!confirmUpdate) return;

      updateMahasiswa(form.nim, form);
    } else {
      const exists = mahasiswa.find((mhs) => mhs.nim === form.nim);
      if (exists) {
        alert("NIM harus unique");
        return;
      }

      addMahasiswa(form);
    }

    setForm({
      nim: "",
      nama: "",
      status: true,
    });
    setIsEdit(false);
    setIsModalOpen(false);
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2">NIM</th>
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {mahasiswa.map((mhs) => (
                <tr key={mhs.nim} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {mhs.nim}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {mhs.nama}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {mhs.status ? "Aktif" : "Tidak Aktif"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                    >
                      Detail
                    </Button>

                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEdit(mhs)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(mhs.nim)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold">
                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <Label htmlFor="nim">NIM</Label>
                <Input
                  type="text"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  readOnly={isEdit}
                  placeholder="Masukkan NIM"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="status"
                    checked={form.status}
                    onChange={handleChange}
                  />
                  <span>{form.status ? "Aktif" : "Tidak Aktif"}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>

                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mahasiswa;
