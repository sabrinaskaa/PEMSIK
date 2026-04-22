import { useState } from "react";
import AdminLayout from "@/Pages/Admin/AdminLayout";
import Card from "@/Pages/Admin/Components/Card";
import Button from "@/Pages/Admin/Components/Button";
import Modal from "@/Pages/Admin/Components/Modal";

const initialData = [
  { nim: "A11.2023.15263", nama: "Aurelia Dwi Wijayanti" },
  { nim: "A11.2023.15264", nama: "Sabrina Aska Amalina" },
  { nim: "A11.2023.15269", nama: "Nazla Lutfia Ramadhani" },
  { nim: "A11.2023.15270", nama: "Gibran Rais Hilmy Iskandar" },
  { nim: "A11.2023.15275", nama: "Budi Santoso" },
];

const Mahasiswa = ({ onLogout }) => {
  const [mahasiswa, setMahasiswa] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "" });

  const openModal = () => {
    setForm({ nim: "", nama: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      nim: form.nim,
      nama: form.nama,
    };

    setMahasiswa((prev) => [...prev, newData]);
    alert("Mahasiswa berhasil ditambah!");
    closeModal();
  };

  const handleEdit = (item) => {
    alert(`Mahasiswa berhasil di-edit! hehe\n${item.nama}`);
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus mahasiswa ini?",
    );

    if (confirmDelete) {
      setMahasiswa((prev) => prev.filter((m) => m.nim !== item.nim));
      alert("Mahasiswa berhasil terhapus!");
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
          <Button onClick={openModal}>+ Tambah Mahasiswa</Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((item, index) => (
              <tr
                key={item.nim}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{item.nim}</td>
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} title="Tambah Mahasiswa" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="nim" className="block text-sm font-medium">
              NIM
            </label>
            <input
              type="text"
              id="nim"
              name="nim"
              required
              value={form.nim}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="nama" className="block text-sm font-medium">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              required
              value={form.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="w-auto"
            >
              Batal
            </Button>
            <Button type="submit" className="w-auto">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default Mahasiswa;
