export async function onRequestGet(context) {
    const { env } = context;
    try {
        const query = "SELECT id, username, password, status_voting FROM users WHERE role = 'pemilih'";
        const { results } = await env.DB.prepare(query).all();
        return new Response(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal mengambil data." }), { status: 500 });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const data = await request.json();
        
        // JIKA IMPORT MASSAL (Bentuk Array)
        if (Array.isArray(data)) {
            const statements = data.map(item => {
                return env.DB.prepare("INSERT INTO users (username, password, role, status_voting) VALUES (?, ?, 'pemilih', 0)")
                             .bind(item.username, item.password);
            });
            // Eksekusi semua data sekaligus (Batch Insert)
            await env.DB.batch(statements);
            return new Response(JSON.stringify({ success: true, message: "Bulk import berhasil" }), { status: 200 });
        } 
        // JIKA TAMBAH MANUAL (Bentuk Objek Tunggal)
        else {
            const { username, password } = data;
            const query = "INSERT INTO users (username, password, role, status_voting) VALUES (?, ?, 'pemilih', 0)";
            await env.DB.prepare(query).bind(username, password).run();
            return new Response(JSON.stringify({ success: true, message: "Berhasil ditambah" }), { status: 200 });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal menambah data. Pastikan tidak ada username duplikat." }), { status: 500 });
    }
}

export async function onRequestPut(context) {
    const { request, env } = context;
    try {
        const data = await request.json();
        const { id, username, password, status_voting } = data;
        const query = "UPDATE users SET username = ?, password = ?, status_voting = ? WHERE id = ?";
        await env.DB.prepare(query).bind(username, password, status_voting, id).run();
        return new Response(JSON.stringify({ success: true, message: "Berhasil diupdate" }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal mengupdate data." }), { status: 500 });
    }
}

export async function onRequestDelete(context) {
    const { request, env } = context;
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });
        await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
        return new Response(JSON.stringify({ success: true, message: "Berhasil dihapus" }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal menghapus data." }), { status: 500 });
    }
}