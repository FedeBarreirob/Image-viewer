import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Box, Skeleton, Spinner, Text } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import "./ImagesList.css";
import { IImage } from "../interfaces/image.interface";
import { useNavigate } from "react-router-dom";

export default function ImagesList() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const getImages = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
    );
    if (!res.ok) {
      throw new Error("Error loading images");
    }
    return res.json();
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["images"], getImages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
  });

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchNextPage();
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
    navigate(`/detail/${imageId}`)
  }

  return (
    <>
      <ScrollArea.Root
        className="container-images"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {isLoading ? (
          <Skeleton width="100%" height="70vh" />
        ) : (
          <ScrollArea.Viewport>
            <Box className="grid-container">
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.map((image: IImage) => {
                    const isLoading = loadingImages[image.id] !== false;
                    return (
                      <Box className="grid-item" key={image.id} onClick={() => handleClickImage(image.id)}>
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
            </Box>
          </ScrollArea.Viewport>
        )}
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
