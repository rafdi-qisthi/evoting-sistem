export async function onRequestPost(context) {
    try {
        const db = context.env.DB;
        if (!db) {
            return new Response(JSON.stringify({ error: "Koneksi DB belum terdeteksi" }), { status: 500 });
        }

        const body = await context.request.json();
        
        try {
            // SAYA SUDAH MENGGANTI 'dpt' MENJADI 'users' DI SINI
            await db.prepare("UPDATE users SET password = ? WHERE username = ?")
                .bind(body.passwordBaru, body.username)
                .run();
        } catch (dbError) {
            return new Response(JSON.stringify({ error: "Error Database: " + dbError.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: "OK" }), { status: 200 });
        
    } catch (err) {
        return new Response(JSON.stringify({ error: "Error Sistem: " + err.message }), { status: 500 });
    }
}