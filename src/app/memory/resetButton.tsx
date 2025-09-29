type Props = {
    onClick: () => void;
};

export default function ResetButton({ onClick }: Props) {
    return (
        <button className="flex bg-[#E0E2DB] rounded-xl w-[150px] h-[75px] cursor-pointer" onClick={onClick}>
            <span className="text-black font-bold mx-auto my-auto material-symbols-outlined">
                restart_alt
            </span>

        </button>
    );
};
