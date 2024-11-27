import Remaining from "../basic/Remaining";


export default function EatingBehavior({
    variant = 'primary',
    percent,
    nextRefill,
    lastFed,
    petStatus,
    className,
  }: {
    variant?: 'primary';
    percent: number;
    nextRefill: string;
    lastFed: string;
    petStatus: string;
    className?: string;
  }) {
    return (
        <div className="bg-ebrown h-72 rounded-lg">
            <Remaining variant='food' percent={percent} nextRefill={nextRefill}>
            </Remaining>
        </div>
    );
}