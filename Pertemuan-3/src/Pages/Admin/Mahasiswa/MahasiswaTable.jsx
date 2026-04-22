import Button from "@/Pages/Admin/Components/Button";

const MahasiswaTable = ({ data = [], openEditModal, onDelete, onDetail }) => {
  return (
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
          {data.length > 0 ? (
            data.map((mhs) => (
              <tr key={mhs.nim} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{mhs.nim}</td>
                <td className="border border-gray-300 px-4 py-2">{mhs.nama}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {mhs.status ? "Aktif" : "Tidak Aktif"}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <Button size="sm" onClick={() => onDetail(mhs.nim)}>
                    Detail
                  </Button>

                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(mhs)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(mhs.nim)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 px-4 py-4 text-center text-gray-500"
              >
                Data mahasiswa belum ada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
