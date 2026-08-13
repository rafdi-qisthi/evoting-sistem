export async function onRequestGet(context) {
    const { env } = context;
    try {
        // 1. Buat tabel pengaturan otomatis jika belum ada & ambil statusnya
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS pengaturan (nama TEXT PRIMARY KEY, nilai TEXT)").run();
        await env.DB.prepare("INSERT OR IGNORE INTO pengaturan (nama, nilai) VALUES ('publikasi', '0')").run();
        const set = await env.DB.prepare("SELECT nilai FROM pengaturan WHERE nama = 'publikasi'").first();
        const isPublished = set ? set.nilai : '0';

        // 2. Ambil hasil suara
        const query = "SELECT id, nama, total_suara FROM kandidat ORDER BY total_suara DESC";
        const { results } = await env.DB.prepare(query).all();

        let totalSuaraMasuk = 0;
        results.forEach(k => totalSuaraMasuk += k.total_suara);

        const hasilAkhir = results.map(k => {
            let persentase = totalSuaraMasuk > 0 ? ((k.total_suara / totalSuaraMasuk) * 100).toFixed(1) : 0;
            return { id: k.id, nama: k.nama, total_suara: k.total_suara, persentase };
        });

        return new Response(JSON.stringify({
            is_published: isPublished,
            total_keseluruhan: totalSuaraMasuk,
            kandidat: hasilAkhir
        }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal mengambil data" }), { status: 500 });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const data = await request.json();
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS pengaturan (nama TEXT PRIMARY KEY, nilai TEXT)").run();
        await env.DB.prepare("INSERT OR IGNORE INTO pengaturan (nama, nilai) VALUES ('publikasi', '0')").run();
        await env.DB.prepare("UPDATE pengaturan SET nilai = ? WHERE nama = 'publikasi'").bind(data.publikasi).run();
        return new Response(JSON.stringify({ success: true, publikasi: data.publikasi }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal update status" }), { status: 500 });
    }
}