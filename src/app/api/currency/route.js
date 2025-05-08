let tcmbCache = {
    data: null,
    timestamp: 0
}

const ONE_DAY = 1000 * 60 * 60 * 24; // 24 saat


async function getTcmb() {
    const response = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml");
    const text = await response.text();
    return text;
}

export async function GET() {
    const now = Date.now();

    if (tcmbCache.data && now - tcmbCache.timestamp < ONE_DAY) {
        return new Response(tcmbCache.data, {
            headers: { 'Content-Type': 'application/xml' },
        });
    }


    try {
        const data = await getTcmb();
        tcmbCache = {
            data,
            timestamp: now,
        };
        return new Response(data, {
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        console.error("TCMB verisi alınırken hata:", error);
        return new Response("Hata oluştu", { status: 500 });
    }
}
