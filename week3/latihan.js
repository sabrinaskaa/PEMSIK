const mahasiswa = {
  nim: "A11.2023.15265",
  nama: "Andi Setiawan",
  status: true,
  matkul: [
    { matkulId: "A11.4501", nilai: 88 },
    { matkulId: "A11.4502", nilai: 84 },
    { matkulId: "A11.4503", nilai: 88 },
    { matkulId: "A11.4504", nilai: 80 },
  ],
};
console.log(mahasiswa);

const listMahasiswa = [
  {
    nama: "Aska",
    nim: "A11.2023.15264",
    umur: 17,
  },
  {
    nama: "Andi",
    nim: "A11.2023.15264",
    umur: 18,
  },
];

const newMahasiswa = {
  nama: "Sabrina",
  nim: "A11.2023.15266",
  umur: 19,
};
const newListMahasiswa = [...listMahasiswa, newMahasiswa];
console.log(newListMahasiswa);

console.log(listMahasiswa);

console.log("Data Diri Mahasiswa:");
listMahasiswa.forEach((mhs) => {
  console.log(`Nama: ${mhs.nama}, NIM: ${mhs.nim}, Umur: ${mhs.umur}`);
});

const { nama, nim, umur } = listMahasiswa[0];
console.log(`Nama: ${nama}, NIM: ${nim}, Umur: ${umur}`);
