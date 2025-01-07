import { AlertDialog, Button, Flex } from "@radix-ui/themes";

// Componente para el AlertDialog
export default function AlertDialogComponent({
  title,
  message,
  handleClose
}: {
  title: string;
  message: string;
  handleClose: () => void;
}) {

  return (
    <>
      {/* Mostrar el AlertDialog cuando isOpen es verdadero */}
      <AlertDialog.Root open={true} >
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description size="2">{message}</AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">           
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleClose}>
                Done
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
