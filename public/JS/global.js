// Memasukkan kerangka HTML Modal secara otomatis ke dalam halaman
document.addEventListener("DOMContentLoaded", () => {
    const modalHTML = `
    <div id="customModal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-icon" id="modalIcon">⚠️</div>
            <h3 class="modal-title" id="modalTitle">Konfirmasi</h3>
            <p class="modal-text" id="modalText">Pesan di sini</p>
            <div class="modal-actions">
                <button id="modalCancel" class="btn-modal btn-modal-cancel">Batal</button>
                <button id="modalConfirm" class="btn-modal btn-modal-confirm">Oke</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});

// Fungsi pemanggil Custom Modal
window.showCustomModal = function(message, type = 'alert') {
    return new Promise((resolve) => {
        // Beri sedikit jeda agar DOM sempat dimuat jika dipanggil terlalu cepat
        setTimeout(() => {
            const overlay = document.getElementById('customModal');
            const title = document.getElementById('modalTitle');
            const text = document.getElementById('modalText');
            const icon = document.getElementById('modalIcon');
            const btnCancel = document.getElementById('modalCancel');
            const btnConfirm = document.getElementById('modalConfirm');

            text.innerText = message;

            if (type === 'confirm') {
                title.innerText = "Konfirmasi Tindakan"; icon.innerText = "⚠️";
                btnCancel.style.display = "block"; btnConfirm.innerText = "Lanjutkan";
            } else if (type === 'success') {
                title.innerText = "Berhasil!"; icon.innerText = "✅";
                btnCancel.style.display = "none"; btnConfirm.innerText = "Tutup";
            } else {
                title.innerText = "Peringatan"; icon.innerText = "🚨";
                btnCancel.style.display = "none"; btnConfirm.innerText = "Tutup";
            }

            overlay.classList.add('show');
            const closeModal = (result) => {
                overlay.classList.remove('show');
                btnConfirm.onclick = null;
                btnCancel.onclick = null;
                resolve(result);
            };
            btnConfirm.onclick = () => closeModal(true);
            btnCancel.onclick = () => closeModal(false);
        }, 50); 
    });
};