export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const data = await request.json();
        const username = data.username;
        const kandidat_id = data.kandidat_id;

        if (!username || !kandidat_id) {
            return new Response(JSON.stringify({ error: "Data tidak lengkap!" }), { status: 400 });
        }

        // Ubah pencarian ke tabel users
        const cekUser = await env.DB.prepare("SELECT status_voting FROM users WHERE username = ?").bind(username).first();
        
        if (!cekUser) {
            return new Response(JSON.stringify({ error: "Akun tidak valid!" }), { status: 404 });
        }
        if (cekUser.status_voting === 1) {
            return new Response(JSON.stringify({ error: "Akses ditolak: Akun sudah digunakan!" }), { status: 403 });
        }

        // Ubah update ke tabel users
        const updatePemilih = env.DB.prepare("UPDATE users SET status_voting = 1 WHERE username = ?").bind(username);
        const updateKandidat = env.DB.prepare("UPDATE kandidat SET total_suara = total_suara + 1 WHERE id = ?").bind(kandidat_id);

        await env.DB.batch([updatePemilih, updateKandidat]);

        return new Response(JSON.stringify({ success: true, message: "Suara berhasil dicatat!" }), { status: 200 });

    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal memproses suara." }), { status: 500 });
    }
}