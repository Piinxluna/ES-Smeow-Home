import Button from "@/components/basic/Button";

export default function NavBar() {
    return (
        <div className="rounded-lg w-fit h-fit bg-epink p-4">
            <h1 className="text-white font-bold text-center text-2xl mb-4 mt-2">Control</h1>
            <div className="flex space-x-2 mb-4">
                <Button variant='primary' href='/food'>Food</Button>
                <Button variant='primary' href='/water'>Water</Button>
                <Button variant='primary' href='/play'>Laser</Button>
                <Button variant='primary' href='/watch-live'>Watch-Live</Button>
            </div>
        </div>  
    );
}