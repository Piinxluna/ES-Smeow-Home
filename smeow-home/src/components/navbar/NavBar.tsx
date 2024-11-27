import Button from "@/components/basic/Button";

export default function NavBar({
    variant = 'primary',
    className = '',
  }: {
    variant?: string;
    className?: string;
}) {
    if(variant === 'primary'){
    return (
        <div className="rounded-lg w-90 h-fit bg-epink md:p-4 py-2 px-6">
            <h1 className="text-white font-bold text-center md:text-2xl text-xl mb-2 mt-1">Control</h1>
            <div className="flex space-x-2 mb-2" >
                <Button variant='primary' href='/food/auto'>Food</Button>
                <Button variant='primary' href='/water'>Water</Button>
                <Button variant='primary' href='/play'>Laser</Button>
                <Button variant='primary' href='/watch-live'>WatchLive</Button>
            </div>
        </div>  
    );}
    else if (variant === 'secondary'){
        return (
            <div className="rounded-lg h-fit bg-epink md:p-4 py-2 px-6 flex space-x-2 mb-2 items-center">
                <h1 className="text-white font-bold text-center md:text-xl text-l mr-2">Control</h1>
                <Button variant='secondary' href='/food/auto' >Food</Button>
                <Button variant='secondary' href='/water'>Water</Button>
                <Button variant='secondary' href='/play'>Laser</Button>
                <Button variant='secondary' href='/watch-live'>WatchLive</Button>
            </div>
        );
    }
}