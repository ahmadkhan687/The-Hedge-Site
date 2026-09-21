import type { Metadata } from "next";
import { redirect } from "next/navigation";
import StudyDownloadForm from "@/components/perspectives/StudyDownloadForm";
import StudyPasswordGate from "@/components/perspectives/StudyPasswordGate";
import {
  hasStudyAccess,
  isStudyPasswordConfigured,
  STUDY_PAGE_PATH,
} from "@/lib/study-access";

const title = "Download full brief | Pakistan’s Administrative Geography";
const description =
  "Request the full Pakistan Administrative Geography study PDF by download or email.";
const url = `https://thehedgecollective.co.uk${STUDY_PAGE_PATH}/download`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: url },
};

export default async function StudyDownloadPage() {
  if (!isStudyPasswordConfigured()) {
    redirect(STUDY_PAGE_PATH);
  }

  const unlocked = await hasStudyAccess();
  if (!unlocked) {
    return <StudyPasswordGate />;
  }

  return <StudyDownloadForm />;
}
