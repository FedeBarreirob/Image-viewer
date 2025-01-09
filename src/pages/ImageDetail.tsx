import { Box, Text } from "@radix-ui/themes";
import CardImageDetail from "../components/CardImageDetail";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function ImageDetail() {
  const { id } = useParams();

  const getImageDetail = async () => {
    const res = await fetch(`https://picsum.photos/id/${id}/info`);
    if (!res.ok) {
      throw new Error("Error loading image detail");
    }
    return res.json();
  };

  const { data, isLoading, isError, isFetching } = useQuery(
    "image-detail",
    getImageDetail
  );

  return (
    <Box className="centered-container">
      <CardImageDetail image={data} isLoading={isLoading} isFetching={isFetching} />

      {isError && (
        <Box className="container-error">
          <Text>An error has occurred.</Text>
        </Box>
      )}
    </Box>
  );
}
