import { useState } from "react";
import { toast } from "sonner";
import VersionCard from "../components/cubic/general/VersionCard";
import { Button } from "../components/ui/button";
import { Download, CheckCircle, AlertTriangle } from "lucide-react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "warning">(
    "loading",
  );

  function download(version: string) {
    setStatus("loading");

    const toastId = toast.loading(`Downloading ${version}...`, {
      description: `Progress: 0%`,
      icon: <Download />,
    });

    const promise = new Promise<void>((resolve, reject) => {
      const handleProgress = (data: number) => {
        setProgress(data);
        toast(`Downloading ${version}...`, {
          id: toastId,
          description: `Progress: ${data}%`,
        });
      };

      const handleComplete = () => {
        setStatus("success");
        toast.success(`Downloaded ${version}`, {
          id: toastId,
          description: "Download completed successfully!",
          icon: <CheckCircle />,
        });
        resolve();
        cleanup();
      };

      const handleError = (err: any) => {
        setStatus("warning");
        toast.error(`Error downloading ${version}`, {
          id: toastId,
          description: err?.message || "Something went wrong",
          icon: <AlertTriangle />,
        });
        reject(err);
        cleanup();
      };

      const cleanup = () => {
        window.cubic.events.offDownloadProgress(handleProgress);
        window.cubic.events.offDownloadComplete(handleComplete);
        window.cubic.events.offDownloadError?.(handleError);
      };

      window.cubic.events.onDownloadProgress(handleProgress);
      window.cubic.events.onDownloadComplete(handleComplete);
      window.cubic.events.onDownloadError?.(handleError);

      try {
        window.cubic.launcher.downloadVersion(version);
      } catch (err) {
        handleError(err);
      }
    });

    // Optional: return the promise if you want to await or chain it
    return promise;
  }

  return (
    <div>
      <VersionCard
        progress={progress}
        status={status}
        onToggleStatus={(nextStatus) => setStatus(nextStatus)}
      />
      <div>
        <Button onClick={() => download("1.9")}>Descargar versión 1.9</Button>
      </div>
    </div>
  );
}
