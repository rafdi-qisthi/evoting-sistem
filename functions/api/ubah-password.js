export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const body = await context.request.json();
        const { username, passwordBaru } = body;

        // Validasi data tidak boleh kosong
        if (!username || !passwordBaru) {
            return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
        }

        // Jalankan perintah Update ke tabel DPT
        await db.prepare("UPDATE dpt SET password = ? WHERE username = ?")
            .bind(passwordBaru, username)
            .run();

        // Jika perintah di atas jalan tanpa kendala, berarti 100% SUKSES!
        return new Response(JSON.stringify({ success: true, message: "Password berhasil diperbarui" }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });
        
    } catch (err) {
        // Tangkap error jika terjadi masalah
        return new Response(JSON.stringify({ error: "Server Error", detail: err.message }), { status: 500 });
    }
}