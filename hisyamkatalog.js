document.addEventListener("DOMContentLoaded", function() {
        const jsonUrl = "https://raw.githubusercontent.com/hisyam-coder/dataprodukbharata/refs/heads/bharata/data-bharata.json"; 
        const container = document.getElementById("daftar-produk-container");
        fetch(jsonUrl).then(response => response.json()).then(data => {
          // Mengonversi objek menjadi array dan mengurutkan berdasarkan namaobat
            const katalogbharata = Object.keys(data).map(key => data[key]) 
              .sort((a, b) => {
                const nameA = a.namaobat.toLowerCase(); 
                const nameB = b.namaobat.toLowerCase();
                return nameA.localeCompare(nameB); 
              });
          // Menambahkan produk acak ke dalam container
          katalogbharata.forEach(produk => {
            // Buat elemen baru untuk setiap produk
            const colDiv = document.createElement("div");
            colDiv.className = "col-6 p-2";
            colDiv.style.cursor = "pointer";
            colDiv.style.position = "relative";
            colDiv.id = "produkwadah";
            // Hapus kata 'Bharata' dari nama obat
            const namaObatCleaned = produk.namaobat.replace(/Bharata/i, "").trim();
            colDiv.addEventListener("click", () => {
              const href = `https://www.bharatainternasional.store/p/produk.html?bh=bharata.${namaObatCleaned.replace(/\s+/g, "")}`;
              window.location.href = href; 
            });

            const labeldiv = document.createElement("div");
            labeldiv.style.position = "absolute";
            labeldiv.id = "labeldiv";
            labeldiv.style.top = "0";
            const labelproduk = `<span style="color:white;background-color:#c79004;padding:2px 8px;border-radius:50px 0px 50px 0px;font-size:9px;font-style:italic;">Original</span>`;
            labeldiv.innerHTML = labelproduk

            // Elemen container
const labelspesifik = document.createElement("div");
labelspesifik.style.position = "absolute";
labelspesifik.style.right = "5%";
labelspesifik.style.top = "0%";
            // Periksa nama obat untuk menentukan label
const bestSellerList = ["Galrida", "Dekapro", "Verdilla", "Chanamax", "Hexfida", "Libaver", "Vellare", "Retlifa"];
const termurahList = ["Cloventa"];
const terlarisList = ["Etheral"];
const premiumList = ["Drivago"];

let label = "";
if (terlarisList.some((item) => produk.namaobat.includes(item))) {
  label = `<span style="color:white;background-color:blue;padding:2px 20px;border-radius:2px;font-size:9px;font-weight:bold;">TERLARIS</span>`;
} else if (bestSellerList.some((item) => produk.namaobat.includes(item))) {
  label = `<span style="color:blue;background-color:gold;padding:2px 10px;border-radius:2px;font-size:9px;font-weight:bold;">BEST SELLER</span>`;
} else if (termurahList.some((item) => produk.namaobat.includes(item))) {
  label = `<span style="color:white;background-color:green;padding:2px 10px;border-radius:2px;font-size:9px;font-weight:bold;">TERMURAH</span>`;
} else if (premiumList.some((item) => produk.namaobat.includes(item))) {
  label = `<span style="color:white;background-color:darkred;padding:2px 20px;border-radius:2px;font-size:9px;font-weight:bold;">PREMIUM</span>`;
}

labelspesifik.innerHTML = label
            // Buat elemen gambar
            const imgElement = document.createElement("img");
            imgElement.src = produk.fotoobat; 
            imgElement.alt = produk.namaobat; 
            // Buat elemen untuk nama obat
            const produkText = document.createElement("div");
            produkText.id = "produkserupa";
            produkText.textContent = produk.namaobat;
// Buat elemen baru
const produkKeyword = document.createElement("div");
produkKeyword.id = "produkkeyword";

// Contoh data JSON (asumsikan produk.khasiatobat adalah array ini)
const khasiatObat = produk.khasiatobat;

// Filter teks yang diawali dengan "Mengobati", lalu ubah menjadi "Obat"
const filteredKhasiat = khasiatObat
  .map(khasiat => {
    if (khasiat.toLowerCase().startsWith("mengobati")) {
      // Jika diawali dengan "Mengobati", ubah menjadi "Obat"
      return khasiat.replace(/^Mengobati/i, "Obat");
    } else {
      // Jika tidak, biarkan teks apa adanya
      return khasiat;
    }
  });
// Gabungkan hasil menjadi teks maksimal 3 baris
const teksYangDitampilkan = filteredKhasiat.slice(0, 5).join(", ");
produkKeyword.textContent = teksYangDitampilkan;
            // Buat elemen untuk harga
            const hargaUp = document.createElement("div");
            hargaUp.id = "hargaserupa";
            hargaUp.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">${produk.hargaobat} <span style="width:25px;color: white;background-color: darkgreen;padding: 2.4px 5px 1.5px 5px; border-radius: 2px; font-size:7px;margin-right:5px;">COD</span></div>`;
            const harga = document.createElement("div");
            harga.id = "hargaupserupa";
            harga.innerHTML = `<s>${produk.hargaobatup}</s>`;
            // Gabungkan elemen-elemen tersebut ke dalam div colDiv
            colDiv.appendChild(labeldiv);
            colDiv.appendChild(labelspesifik);
            colDiv.appendChild(imgElement);
            colDiv.appendChild(produkText);
            colDiv.appendChild(produkKeyword);
            colDiv.appendChild(harga);
            colDiv.appendChild(hargaUp);
            // Masukkan colDiv ke dalam container produk
            container.appendChild(colDiv);
          });
        }).catch(error => console.error('Gagal memuat JSON:', error));
      });
