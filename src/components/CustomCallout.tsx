import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout } from "@radix-ui/themes";
import "./CustomCallout.css";
import { IAlert } from "../interfaces/alert.interface";

interface customCalloutProps {
  alert: IAlert;
}

export default function CustomCallout({ alert }: customCalloutProps) {
  return (
    <Box className="container">
      <Callout.Root color="red">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{alert.text}</Callout.Text>
      </Callout.Root>
    </Box>
  );
}
