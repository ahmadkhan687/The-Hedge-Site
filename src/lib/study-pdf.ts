import { createClient } from "@supabase/supabase-js";
import { getStudyPdfConfig } from "@/lib/study-access";

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase service role is not configured.");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Download the private study PDF from Supabase Storage (server-only). */
export async function fetchStudyPdfBuffer(): Promise<{
  buffer: Buffer;
  filename: string;
  contentType: string;
}> {
  const config = getStudyPdfConfig();
  if (!config) {
    throw new Error("Study PDF storage is not configured.");
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage
    .from(config.bucket)
    .download(config.path);

  if (error || !data) {
    throw new Error("Unable to load the study PDF.");
  }

  const arrayBuffer = await data.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    filename: config.filename,
    contentType: "application/pdf",
  };
}
