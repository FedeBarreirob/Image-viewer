import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Box, Skeleton, Spinner, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import "./ImagesList.css";
import { IImage } from "../interfaces/image.interface";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

interface ImagesListProps {
  images: IImage[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  isError?: boolean;
  isLoading?: boolean;
}

export default function ImagesList({
  images,
  fetchNextPage,
  isFetchingNextPage,
  isError,
  isLoading,
}: ImagesListProps) {
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
    <>
      <ScrollArea.Root
        className="container-images"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {isLoading && (
          <Box className="container-spinner">
            <Spinner />
          </Box>
        )}
        <ScrollArea.Viewport>
          <Box className="grid-container">
            {images.map((image: IImage) => {
              const isLoading = loadingImages[image.id] !== false;
              return (
                <Box className="grid-item" key={image.id}>
                  <Box className="container-favorite">
                    <FavoriteButton image={image} />
                  </Box>
                  {isLoading && <Skeleton width="100%" height="200px" />}
                  <Box className="container-image-text" onClick={() => handleClickImage(image.id)}>
                    <img
                      src={image.download_url}
                      alt={image.author}
                      className={`grid-image ${isLoading ? "hidden" : ""}`}
                      onLoad={() => handleImageLoad(image.id)}
                      onError={() => handleImageError(image.id)}
                    />
                    <Text className={"grid-text"}>{image.author}</Text>
                  </Box>
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
    </>
  );
}
