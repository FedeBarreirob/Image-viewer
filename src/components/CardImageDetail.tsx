import {
  Box,
  Button,
  Card,
  Inset,
  Skeleton,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { IImage } from "../interfaces/image.interface";
import "./CardImageDetail.css";
import useDownloadImage from "../hooks/useDownloadImage";
import FavoriteButton from "./FavoriteButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface CardImageDetailProps {
  image: IImage;
  isLoading: boolean;
  isFetching: boolean;
}

export default function CardImageDetail({
  image,
  isLoading,
  isFetching,
}: CardImageDetailProps) {
  const navigate = useNavigate();
  const { handleDownload, downloading } = useDownloadImage(
    image?.download_url,
    image?.id
  );

  const handleGoBack = () => navigate(-1);

  return (
    <Box className="card-image-detail">
      <Card className="card-image" size="3">
        <ChevronLeftIcon
          width={25}
          height={25}
          className="go-back-icon"
          onClick={handleGoBack}
        />
        <Box className="bookmark-button">
          <FavoriteButton image={image} />
        </Box>
        <Skeleton loading={isLoading || isFetching}>
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={image?.download_url}
              alt={image?.author}
              className="image"
            />
          </Inset>
        </Skeleton>
        <Box className="card-content">
          <Text as="p" size="5" className="card-author">
            <Skeleton loading={isLoading || isFetching}>
              <Strong style={{ fontSize: "1.5rem" }}>{image?.author}</Strong>
            </Skeleton>
          </Text>

          <Text as="p" size="4" className="card-dimensions">
            <Skeleton loading={isLoading || isFetching}>
              <Strong>Dimensions:</Strong> {image?.width} x {image?.height} px
            </Skeleton>
          </Text>

          <Skeleton loading={isLoading || isFetching}>
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="download-button"
            >
              {downloading ? <Spinner size={"3"} /> : "Download Image"}
            </Button>
          </Skeleton>
        </Box>
      </Card>
    </Box>
  );
}
