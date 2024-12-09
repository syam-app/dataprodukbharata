document.addEventListener("DOMContentLoaded", function() {
        const jsonUrl = "https://raw.githubusercontent.com/hisyam-coder/dataprodukbharata/refs/heads/bharata/data-bharata.json"; 
        const container = document.getElementById("produk-terkait-container");
        fetch(jsonUrl).then(response => response.json()).then(data => {
          
            // Mengonversi objek menjadi array dan mengurutkan berdasarkan namaobat
            const produkArray = Object.keys(data).map(key => data[key]) 
              .sort((a, b) => {
                const nameA = a.namaobat.toLowerCase(); 
                const nameB = b.namaobat.toLowerCase();
                return nameA.localeCompare(nameB); 
              });
            // Membuat elemen berdasarkan array yang sudah diurutkan
            produkArray.forEach(produk => {
              // Buat elemen row untuk setiap produk
              const row = document.createElement("div");
              row.className = "row py-2";
              row.style.borderBottom = "1px solid rgba(0, 0, 0, 0.05)";
              row.setAttribute("role", "button");
              row.style.cursor = "pointer";
              row.classList.add("row-hover");
              // Hapus kata 'Bharata' dari nama obat
              const namaObatCleaned = produk.namaobat.replace(/Bharata/i, "").trim();
              // Atur fungsi klik untuk elemen
              row.addEventListener("click", () => {
                const href = `https://www.bharatainternasional.store/p/produk.html?bh=bharata.${namaObatCleaned.replace(/\s+/g, "")}`;
                window.location.href = href;
              });
              // Elemen gambar
              const colImg = document.createElement("div");
              colImg.className = "col-4";
              const img = document.createElement("img");
              img.id = "fotoobat";
              img.className = "rounded-circle";
              img.src = produk.fotoobat || "https://via.placeholder.com/100"; 
              img.alt = produk.namaobat || "Gambar Produk";
              colImg.appendChild(img);
              // Elemen nama obat
              const colNama = document.createElement("div");
              colNama.className = "col-8 text-start";
              colNama.style.marginLeft = "-10px";
              colNama.style.marginTop = "15px";
              colNama.id = "namaobat";
              colNama.textContent = produk.namaobat;
              // Gabungkan elemen gambar dan nama ke dalam row
              row.appendChild(colImg);
              row.appendChild(colNama);
              // Tambahkan row ke container utama
              const container = document.getElementById("offcanvasproduk"); 
              if (container) {
                container.appendChild(row);
              }
            });
          
        }).catch(error => console.error('Gagal memuat JSON:', error));
      });
