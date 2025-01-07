import { Box } from "@radix-ui/themes";
import ImagesList from "../components/ImagesList";

export default function Home() {
  return (
    <Box>
      <Box style={{height:'10vh'}}>Listado</Box>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Box style={{ width: "40%"}}>
          <ImagesList />
        </Box>
      </Box>
    </Box>
  );
}
