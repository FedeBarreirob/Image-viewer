import { Box, Text } from "@radix-ui/themes";
import ImagesList from "../components/ImagesList";
import useFavoritesStore from "../store/favoriteStore";

export default function Favorites() {
  const { favorites } = useFavoritesStore((state) => state);
  return (
    <Box>
      <Box className="centered-container">
        <Text className="title">My favorites</Text>
        <ImagesList images={favorites} />
      </Box>
    </Box>
  );
}
