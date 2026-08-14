export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        const body = await context.request.json();
        const { username, passwordBaru } = body;

        // Validasi data tidak boleh kosong
        if (!username || !passwordBaru) {
            return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
        }

        // Simpan (Update) password baru ke tabel DPT
        const stmt = await db.prepare("UPDATE dpt SET password = ? WHERE username = ?")
            .bind(passwordBaru, username)
            .run();

        if (stmt.success) {
            return new Response(JSON.stringify({ success: true, message: "Password ter-update" }), { 
                status: 200, 
                headers: { "Content-Type": "application/json" } 
            });
        } else {
            return new Response(JSON.stringify({ error: "Gagal merubah password" }), { status: 500 });
        }
        
    } catch (err) {
        return new Response(JSON.stringify({ error: "Server Error", detail: err.message }), { status: 500 });
    }
}