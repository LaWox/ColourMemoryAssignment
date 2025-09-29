import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import ResetButton from "./resetButton";

type Props = {
    points: number;
    onReset: () => void;
    onCloseModal: () => void;
    isOpen: boolean;
}

export default function GameOverDrawer({ points, onReset, isOpen, onCloseModal }: Props) {
    const onResetClicked = () => {
        onReset();
        onCloseModal();
    }

    return <Dialog open={isOpen}>
        <DialogContent className="">
            <DialogHeader className="text-center justify-items-center grid gap-4">
                <DialogTitle>You got {points} points!!</DialogTitle>
                <DialogDescription>
                    <span>
                        Do you want to play again?
                    </span>
                </DialogDescription>
                <ResetButton onClick={onResetClicked} />
            </DialogHeader>
            <DrawerFooter >
                <DrawerClose className="bg-gray-200 rounded-md p-2 cursor-pointer" onClick={onCloseModal} >
                    Close
                </DrawerClose>
            </DrawerFooter>
        </DialogContent>
    </Dialog>
}