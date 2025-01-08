import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Box, Skeleton, Spinner, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import "./ImagesList.css";
import { IImage } from "../interfaces/image.interface";
import { useNavigate } from "react-router-dom";

interface ImagesListProps {
  images: IImage[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  isError?:boolean
}

export default function ImagesList({ images, fetchNextPage, isFetchingNextPage, isError }: ImagesListProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (fetchNextPage) {
        fetchNextPage();
      }
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleImageError = (id: string) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleClickImage = (imageId: string) => {
    navigate(`/detail/${imageId}`);
  };

  return (
    <Box style={{ width: "60%" }}>
    
      <ScrollArea.Root
        className="container-images"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <ScrollArea.Viewport>
          <Box className="grid-container">
            {images.map((image: IImage) => {
              const isLoading = loadingImages[image.id] !== false;
              return (
                <Box
                  className="grid-item"
                  key={image.id}
                  onClick={() => handleClickImage(image.id)}
                >
                  {isLoading && <Skeleton width="100%" height="200px" />}
                  <img
                    src={image.download_url}
                    alt={image.author}
                    className={`grid-image ${isLoading ? "hidden" : ""}`}
                    onLoad={() => handleImageLoad(image.id)}
                    onError={() => handleImageError(image.id)}
                  />
                  <Text className={"grid-text"}>{image.author}</Text>
                </Box>
              );
            })}
          </Box>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <Box className="container-spinner">
        {isFetchingNextPage && <Spinner className="spinner" />}
      </Box>
      {isError && (
        <Box className="container-error">
          <Text>An error has occurred.</Text>
        </Box>
      )}
    </ Box>
  );
}
