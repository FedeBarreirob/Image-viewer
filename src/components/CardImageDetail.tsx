import {
  Box,
  Button,
  Card,
  Inset,
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
}

export default function CardImageDetail({ image }: CardImageDetailProps) {
  const navigate = useNavigate()
  const { handleDownload, downloading } = useDownloadImage(
    image.download_url,
    image.id
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
        <Inset clip="padding-box" side="top" pb="current">
          <img src={image.download_url} alt={image.author} className="image" />
        </Inset>
        <Box className="card-content">
          <Text as="p" size="5" className="card-author">
            <Strong style={{ fontSize: "1.5rem" }}>{image.author}</Strong>
          </Text>

          <Text as="p" size="4" className="card-dimensions">
            <Strong>Dimensions:</Strong> {image.width} x {image.height} px
          </Text>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="download-button"
          >
            {downloading ? <Spinner size={"3"} /> : "Download Image"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
