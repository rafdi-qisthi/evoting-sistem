export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const data = await request.json();
        const username = data.username;
        const password = data.password;

        if (!username || !password) {
            return new Response(JSON.stringify({ error: "Username dan Password wajib diisi!" }), { status: 400 });
        }

        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        const result = await env.DB.prepare(query).bind(username, password).first();

        if (!result) {
            return new Response(JSON.stringify({ error: "Username atau Password salah!" }), { status: 404 });
        }

        // Ambil status saklar dari database
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS pengaturan (nama TEXT PRIMARY KEY, nilai TEXT)").run();
        await env.DB.prepare("INSERT OR IGNORE INTO pengaturan (nama, nilai) VALUES ('publikasi', '0')").run();
        const set = await env.DB.prepare("SELECT nilai FROM pengaturan WHERE nama = 'publikasi'").first();
        const isPublished = set ? set.nilai : '0';

        return new Response(JSON.stringify({ 
            success: true, 
            role: result.role, 
            status_voting: result.status_voting,
            is_published: isPublished,
            message: "Login berhasil" 
        }), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (e) {
        return new Response(JSON.stringify({ error: "Terjadi kesalahan pada server." }), { status: 500 });
    }
}