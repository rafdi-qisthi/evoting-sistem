export async function onRequestGet(context) {
    const { env } = context;

    try {
        // 1. Menghitung Total DPT (Hanya yang memiliki role 'pemilih')
        const dptQuery = await env.DB.prepare("SELECT COUNT(*) as total FROM users WHERE role = 'pemilih'").first();
        const totDPT = dptQuery ? dptQuery.total : 0;

        // 2. Menghitung Total Suara Masuk (Pemilih yang sudah mencoblos / status_voting = 1)
        const suaraQuery = await env.DB.prepare("SELECT COUNT(*) as total FROM users WHERE role = 'pemilih' AND status_voting = 1").first();
        const totSuara = suaraQuery ? suaraQuery.total : 0;

        // 3. Menghitung Total Pasangan Calon
        const paslonQuery = await env.DB.prepare("SELECT COUNT(*) as total FROM kandidat").first();
        const totPaslon = paslonQuery ? paslonQuery.total : 0;

        // Mengirimkan data dalam format JSON ke Dashboard Admin
        return new Response(JSON.stringify({
            totDPT: totDPT,
            totSuara: totSuara,
            totPaslon: totPaslon
        }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal mengambil data statistik dari database." }), { status: 500 });
    }
}