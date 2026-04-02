let mahasiswa = {
  nama: "Sabrina Aska Amalina",
  nim: "A11.2023.15264",
};

let listMatkul = [
  { matkulId: "A11.4501", nilai: 90, matkulNama: "Pemrograman Web" },
  { matkulId: "A11.4502", nilai: 90, matkulNama: "Basis Data" },
  { matkulId: "A11.4503", nilai: 90, matkulNama: "Jaringan Komputer" },
  { matkulId: "A11.4504", nilai: 90, matkulNama: "Bahasa Indonesia" },
];

let detailMahasiswa = {
  ...mahasiswa,
  matkul: listMatkul,
};

const { nama, nim, matkul } = detailMahasiswa;

console.log("Biodata Mahasiswa:");
console.log(
  `Nama: ${nama}, NIM: ${nim}, Mata Kuliah: ${matkul.map((m) => m.matkulNama).join(", ")}`,
);
