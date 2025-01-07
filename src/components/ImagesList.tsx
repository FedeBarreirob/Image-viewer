import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Box, Skeleton, Spinner, Text } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import "./ImagesList.css";
import { IImage } from "../interfaces/image.interface";

export default function ImagesList() {
  const scrollRef = useRef(null);
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const getImages = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
    );
    if (!res.ok) {
      throw new Error("Error al cargar las imágenes");
    }
    return res.json();
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["images"], getImages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
  });

  const handleScroll = () => {};

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

  return (
    <ScrollArea.Root
      className="containerImages"
      onScroll={handleScroll}
      ref={scrollRef}
    >
      <ScrollArea.Viewport>
        <div className="grid-container">
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((image: IImage) => {
                const isLoading = loadingImages[image.id] !== false; 
                return (
                  <Box className="grid-item" key={image.id}>
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
            </React.Fragment>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
    </ScrollArea.Root>
  );
}
