import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderDialog({ open, onOpenChange }: OrderDialogProps) {
  const handleOrder = () => {
    console.log("Order placed!");
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[300px] flex flex-col items-center justify-center gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Захиалах уу?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleOrder}
            className="w-[100px] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]"
          >
            Захиалах
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={handleCancel}
            className="w-[100px] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]"
          >
            Цуцлах
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 