import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
        <DialogContent showCloseButton={false} >
            <DialogHeader className="text-center justify-items-center grid gap-4">
                <DialogTitle>You got {points} points!!</DialogTitle>
                <DialogDescription>
                    <span>
                        Do you want to play again?
                    </span>
                </DialogDescription>
                <ResetButton onClick={onResetClicked} />
            </DialogHeader>
            <DialogFooter className="mx-auto justify-items-center grid gap-4">
                <DialogClose onClick={onCloseModal} className="cursor-pointer border-2 border black rounded-lg px-4 py-2">
                    Close
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}