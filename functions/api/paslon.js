export async function onRequestGet(context) {
    const { env } = context;
    try {
        const query = "SELECT * FROM kandidat";
        const { results } = await env.DB.prepare(query).all();
        return new Response(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal mengambil data paslon." }), { status: 500 });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const data = await request.json();
        
        // JIKA IMPORT MASSAL (Bentuk Array)
        if (Array.isArray(data)) {
            const statements = data.map(item => {
                return env.DB.prepare("INSERT INTO kandidat (nama, visi_misi, total_suara) VALUES (?, ?, 0)")
                             .bind(item.nama, item.visi_misi);
            });
            await env.DB.batch(statements);
            return new Response(JSON.stringify({ success: true, message: "Bulk import berhasil" }), { status: 200 });
        } 
        // JIKA TAMBAH MANUAL (Objek Tunggal)
        else {
            const { nama, visi_misi } = data;
            const query = "INSERT INTO kandidat (nama, visi_misi, total_suara) VALUES (?, ?, 0)";
            await env.DB.prepare(query).bind(nama, visi_misi).run();
            return new Response(JSON.stringify({ success: true, message: "Paslon berhasil ditambah" }), { status: 200 });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal menambah data paslon." }), { status: 500 });
    }
}

export async function onRequestPut(context) {
    const { request, env } = context;
    try {
        const data = await request.json();
        const { id, nama, visi_misi } = data;
        const query = "UPDATE kandidat SET nama = ?, visi_misi = ? WHERE id = ?";
        await env.DB.prepare(query).bind(nama, visi_misi, id).run();
        return new Response(JSON.stringify({ success: true, message: "Paslon berhasil diupdate" }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal mengupdate data paslon." }), { status: 500 });
    }
}

export async function onRequestDelete(context) {
    const { request, env } = context;
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });
        await env.DB.prepare("DELETE FROM kandidat WHERE id = ?").bind(id).run();
        return new Response(JSON.stringify({ success: true, message: "Paslon berhasil dihapus" }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal menghapus paslon." }), { status: 500 });
    }
}