import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout } from "@radix-ui/themes";
import "./CustomCallout.css";
import useAlertStore from "../store/alertStore";


export default function CustomCallout() {
  const alert = useAlertStore((state) => state.alert);
  if (!alert?.open) return null;
  return (
    <Box className="container">
      <Box style={{display:'flex',justifyContent:'center',width:'100%'}}>
        <Callout.Root color={alert?.color}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{alert?.text}</Callout.Text>
        </Callout.Root>
      </Box>
    </Box>
  );
}
