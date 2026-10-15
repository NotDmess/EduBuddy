// ==============================================================================
// EduBuddy PWA — Runtime Environment Configuration Endpoint (Vercel Serverless)
// ==============================================================================
// Dynamically provides public Supabase URL & public anonymous key to frontend client.
// SECURITY: Only public anon key is read. Never expose backend admin keys or secrets.
// ==============================================================================

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabaseUrl = (
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ''
  ).trim();

  const supabaseAnonKey = (
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ''
  ).trim();

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  return res.status(200).json({
    supabaseUrl,
    supabaseAnonKey
  });
}
