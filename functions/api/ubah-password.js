export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        if (!db) {
            return new Response(JSON.stringify({ error: "Koneksi DB belum terdeteksi oleh sistem" }), { status: 500 });
        }

        const body = await context.request.json();
        
        // Kita tangkap error spesifik dari Database D1
        try {
            await db.prepare("UPDATE dpt SET password = ? WHERE username = ?")
                .bind(body.passwordBaru, body.username)
                .run();
        } catch (dbError) {
            // Jika tabel dpt tidak ada, pesan aslinya akan dilempar ke sini!
            return new Response(JSON.stringify({ error: "Error Database: " + dbError.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: "OK" }), { status: 200 });
        
    } catch (err) {
        return new Response(JSON.stringify({ error: "Error Sistem: " + err.message }), { status: 500 });
    }
}