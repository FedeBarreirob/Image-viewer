import { Box } from "@radix-ui/themes";
import CardImageDetail from "../components/CardImageDetail";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function ImageDetail() {
  const params = useParams();
    console.log('parent');
    
  const getImageDetail = async () => {
    const res = await fetch(`https://picsum.photos/id/${params.id}/info`);
    if (!res.ok) {
      throw new Error("Error loading image detail");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery(
    ["imageDetail", params.id],
    () => getImageDetail(),
  );

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading ? "Cargando..." : <CardImageDetail image={data} />}
    </Box>
  );
}
