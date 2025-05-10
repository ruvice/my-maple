export default async function handler(req: any, res: any) {
    const { path, ...restQuery } = req.query;
    const apiKey = process.env.OPEN_API_KEY2;
    const domain = process.env.OPEN_API_DOMAIN;
  
    if (!apiKey || !domain || typeof path !== "string") {
        return res.status(400).json({ error: "Missing required parameters or env vars" });
    }
  
    const url = new URL(`${domain}/${path}`);
  
    // Append all query params to URL
    Object.entries(restQuery).forEach(([key, value]) => {
        if (typeof value === "string") {
            url.searchParams.append(key, value);
        }
    });
  
    try {
        const apiRes = await fetch(url.toString(), {
            headers: {
                "x-nxopen-api-key": apiKey,
            },
        });
    
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
    } catch (err: any) {
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
}
  