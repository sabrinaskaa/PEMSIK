const mataKuliahList = {
  tahunAjar: "2025/2026",
  mataKuliah: [
    { kode: "A11.4501", nama: "Bahasa Indonesia", sks: 2 },
    { kode: "A11.4502", nama: "Basis Data", sks: 3 },
    { kode: "A11.4503", nama: "Pemrograman Web", sks: 3 },
    { kode: "A11.4504", nama: "Jaringan Komputer", sks: 2 },
  ],
};

let mahasiswaList = [
  {
    nim: "A11.2023.15259",
    nama: "Nazla Lutfia Ramadhani",
    status: true,
    mataKuliah: [
      { kode: "A11.4501", tugas: 90, uts: 85, uas: 88 },
      { kode: "A11.4502", tugas: 85, uts: 80, uas: 82 },
      { kode: "A11.4503", tugas: 88, uts: 90, uas: 92 },
      { kode: "A11.4504", tugas: 80, uts: 75, uas: 78 },
    ],
  },
  {
    nim: "A11.2023.15263",
    nama: "Aurelia Dwi Wijayanti",
    status: true,
    mataKuliah: [
      { kode: "A11.4501", tugas: 90, uts: 85, uas: 88 },
      { kode: "A11.4502", tugas: 89, uts: 84, uas: 80 },
      { kode: "A11.4503", tugas: 85, uts: 90, uas: 97 },
      { kode: "A11.4504", tugas: 88, uts: 80, uas: 95 },
    ],
  },
  {
    nim: "A11.2023.15264",
    nama: "Sabrina Azka Amalina",
    status: false,
    mataKuliah: [
      { kode: "A11.4501", tugas: 88, uts: 85, uas: 90 },
      { kode: "A11.4502", tugas: 90, uts: 88, uas: 82 },
      { kode: "A11.4503", tugas: 82, uts: 90, uas: 88 },
      { kode: "A11.4504", tugas: 86, uts: 90, uas: 78 },
    ],
  },
];

const showAllMahasiswa = () => {
  console.log(`Daftar Mahasiswa Tahun Ajaran ${mataKuliahList.tahunAjar}:\n`);
  mahasiswaList.forEach((mahasiswa) => {
    console.log(`NIM: ${mahasiswa.nim}`);
    console.log(`Nama: ${mahasiswa.nama}`);
    console.log(`Status: ${mahasiswa.status ? "Aktif" : "Tidak Aktif"}`);
    console.log("Mata Kuliah:");

    mahasiswa.mataKuliah.forEach((mk) => {
      const mataKuliah = mataKuliahList.mataKuliah.find(
        (m) => m.kode === mk.kode,
      );

      console.log(
        `  - ${mataKuliah?.nama || "Mata kuliah tidak ditemukan"} (${mk.kode})`,
      );
      console.log(`    Tugas: ${mk.tugas}`);
      console.log(`    UTS: ${mk.uts}`);
      console.log(`    UAS: ${mk.uas}`);
    });

    console.log("\n");
  });
};

const addNewMahasiswa = (nim, nama, status, mataKuliah) => {
  const newMahasiswa = {
    nim,
    nama,
    status,
    mataKuliah,
  };
  mahasiswaList.push(newMahasiswa);
  console.log(`Mahasiswa dengan NIM ${nim} berhasil ditambahkan.`);
};

const updateDataMahasiswa = (nim, dataBaru) => {
  mahasiswaList = mahasiswaList.map((mhs) =>
    mhs.nim === nim ? { ...mhs, ...dataBaru } : mhs,
  );
  console.log(`Data mahasiswa dengan NIM ${nim} berhasil diupdate.`);
};

const deleteMahasiswaByNim = (nim) => {
  mahasiswaList = mahasiswaList.filter((mhs) => mhs.nim !== nim);
  console.log(`Mahasiswa dengan NIM ${nim} berhasil dihapus.`);
};

const totalNilaiMahasiswa = (nim) => {
  const mahasiswa = mahasiswaList.find((mhs) => mhs.nim === nim);

  if (!mahasiswa) {
    console.log(`Mahasiswa dengan NIM ${nim} tidak ditemukan.`);
    return [];
  }

  return mahasiswa.mataKuliah.map((mk) => {
    const detailMatkul = mataKuliahList.mataKuliah.find(
      (item) => item.kode === mk.kode,
    );

    return {
      matkulId: mk.kode,
      namaMatkul: detailMatkul?.nama || "Tidak diketahui",
      totalNilai: mk.tugas + mk.uts + mk.uas,
    };
  });
};

const kategoriNilai = (nilai) => {
  if (nilai >= 85) return "A";
  else if (nilai >= 80) return "AB";
  else if (nilai >= 70) return "B";
  else if (nilai >= 65) return "BC";
  else if (nilai >= 50) return "C";
  else if (nilai >= 40) return "D";
  else return "E";
};

const IPSmahasiswa = (nim) => {
  const mahasiswa = mahasiswaList.find((mhs) => mhs.nim === nim);

  if (!mahasiswa) {
    console.log(`Mahasiswa dengan NIM ${nim} tidak ditemukan.`);
    return null;
  }

  const totalSks = mahasiswa.mataKuliah.reduce((sum, mk) => {
    const detailMatkul = mataKuliahList.mataKuliah.find(
      (item) => item.kode === mk.kode,
    );
    return sum + (detailMatkul?.sks || 0);
  }, 0);

  const totalBobot = mahasiswa.mataKuliah.reduce((sum, mk) => {
    const detailMatkul = mataKuliahList.mataKuliah.find(
      (item) => item.kode === mk.kode,
    );

    const nilaiAkhir = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
    return sum + nilaiAkhir * (detailMatkul?.sks || 0);
  }, 0);

  return totalSks === 0 ? 0 : (totalBobot / totalSks).toFixed(2);
};

const clear = () => {
  mahasiswaList = [];
  console.log("Semua data mahasiswa berhasil dihapus.");
};

const jumlahMahasiswa = () => mahasiswaList.length;

const sortMahasiswaByNIM = () => {
  mahasiswaList.sort((a, b) => a.nim.localeCompare(b.nim));
  console.log("Data mahasiswa berhasil diurutkan berdasarkan NIM.");
};

const sortMahasiswaByStatus = () => {
  mahasiswaList.sort((a, b) => b.status - a.status);
  console.log("Data mahasiswa berhasil diurutkan berdasarkan status.");
};

const jumlahMahasiswaAktifTidak = () => {
  return {
    aktif: mahasiswaList.filter((mhs) => mhs.status).length,
    tidakAktif: mahasiswaList.filter((mhs) => !mhs.status).length,
  };
};

const clearArray = () => {
  mahasiswaList = [];
  console.log("Array mahasiswa berhasil dikosongkan.");
};

showAllMahasiswa();

addNewMahasiswa("A11.2023.15265", "Andi Setiawan", true, [
  { kode: "A11.4501", tugas: 88, uts: 90, uas: 87 },
  { kode: "A11.4502", tugas: 84, uts: 82, uas: 86 },
  { kode: "A11.4503", tugas: 88, uts: 90, uas: 92 },
  { kode: "A11.4504", tugas: 80, uts: 85, uas: 88 },
]);

console.log("Jumlah mahasiswa:", jumlahMahasiswa());

updateDataMahasiswa("A11.2023.15264", {
  nama: "Sabrina Aska Amalina",
});

console.log("Total nilai Aska:", totalNilaiMahasiswa("A11.2023.15264"));

const nilaiContoh = 88;
console.log(`Kategori nilai ${nilaiContoh}:`, kategoriNilai(nilaiContoh));

console.log(
  "IPS Aska:",
  IPSmahasiswa("A11.2023.15264"),
  "|",
  kategoriNilai(IPSmahasiswa("A11.2023.15264")),
);

console.log("Jumlah aktif dan tidak aktif:", jumlahMahasiswaAktifTidak());

sortMahasiswaByNIM();
showAllMahasiswa();

sortMahasiswaByStatus();
showAllMahasiswa();
