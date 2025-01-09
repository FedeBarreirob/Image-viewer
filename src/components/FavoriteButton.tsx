import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import useFavoritesStore from "../store/favoriteStore";
import { IImage } from "../interfaces/image.interface";

interface FavoriteButtonProps {
  image: IImage;
}
export default function FavoriteButton({ image }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  const handleFavorite = () => {
    if (isFavorite(image.id)) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  };

  return (
    <IconButton onClick={handleFavorite}>
      {isFavorite(image?.id) ? (
        <BookmarkFilledIcon width="18" height="18" />
      ) : (
        <BookmarkIcon width="18" height="18" />
      )}
    </IconButton>
  );
}
