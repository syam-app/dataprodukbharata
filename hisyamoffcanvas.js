document.addEventListener("DOMContentLoaded",(function(){document.getElementById("produk-terkait-container");fetch("https://raw.githubusercontent.com/hisyam-coder/dataprodukbharata/refs/heads/bharata/data-bharata.json").then((t=>t.json())).then((t=>{Object.keys(t).map((a=>t[a])).sort(((t,a)=>{const e=t.namaobat.toLowerCase(),o=a.namaobat.toLowerCase();return e.localeCompare(o)})).forEach((t=>{const a=document.createElement("div");a.className="row py-2",a.style.borderBottom="1px solid rgba(0, 0, 0, 0.05)",a.setAttribute("role","button"),a.style.cursor="pointer",a.classList.add("row-hover");const e=t.namaobat.replace(/Bharata/i,"").trim();a.addEventListener("click",(()=>{const t=`https://www.bharatainternasional.store/p/produk.html?bh=bharata.${e.replace(/\s+/g,"")}`;window.location.href=t}));const o=document.createElement("div");o.className="col-4";const n=document.createElement("img");n.id="fotoobat",n.className="rounded-circle",n.src=t.fotoobat||"https://via.placeholder.com/100",n.alt=t.namaobat||"Gambar Produk",o.appendChild(n);const r=document.createElement("div");r.className="col-8 text-start",r.style.marginLeft="-10px",r.style.marginTop="15px",r.id="namaobat",r.textContent=t.namaobat,a.appendChild(o),a.appendChild(r);const c=document.getElementById("offcanvasproduk");c&&c.appendChild(a)}))})).catch((t=>console.error("Gagal memuat JSON:",t)))}));