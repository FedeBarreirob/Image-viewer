import { Box, Text } from "@radix-ui/themes";
import ImagesList from "../components/ImagesList";
import { useInfiniteQuery } from "react-query";

export default function Home() {
  const getImages = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
    );
    if (!res.ok) {
      throw new Error("Error loading images");
    }
    return res.json();
  };

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(["images"], getImages, {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
    });

  return (
    <Box>
      <Box className="centered-container">
        <Text className="title">Gallery</Text>
        <ImagesList
          images={data ? data.pages.flat() : []}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}
