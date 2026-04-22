import { useParams, useNavigate } from "react-router-dom";
import { mahasiswaList } from "@/Data/Dummy";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const navigate = useNavigate();

  const data = mahasiswaList.find((m) => m.nim === nim);

  if (!data) {
    return (
      <Card>
        <Heading as="h2">Detail Mahasiswa</Heading>
        <p>Data mahasiswa tidak ditemukan.</p>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2">Detail Mahasiswa</Heading>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>

      <div className="space-y-3">
        <p>
          <strong>NIM:</strong> {data.nim}
        </p>
        <p>
          <strong>Nama:</strong> {data.nama}
        </p>
        <p>
          <strong>Status:</strong> {data.status ? "Aktif" : "Tidak Aktif"}
        </p>
      </div>
    </Card>
  );
};

export default MahasiswaDetail;
