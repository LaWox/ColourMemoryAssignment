type Props = {
    points: number;
};

export default function PointsIndicator({ points }: Props) {

    return <div className="flex bg-[#E0E2DB] rounded-xl w-[200px] h-[50px]  " >
        <p className="text-center text-black font-xl font-bold mx-auto my-auto">
            {points}
        </p>
    </div>
}


