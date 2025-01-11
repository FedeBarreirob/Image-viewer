import { useCallback, useState } from "react";

const useDownloadImage = (imageUrl: string, imageId: string) => {
  const [downloading, setDownloading] = useState(false);
  const handleDownload = useCallback(async () => {
    if (imageUrl) {
      try {
        setDownloading(true);
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `image-${imageId}.jpg`;
        link.click();
        setDownloading(false);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error trying to download image:", error);
      }
    }
  }, [imageUrl, imageId]);

  return { handleDownload, downloading };
};

export default useDownloadImage;
