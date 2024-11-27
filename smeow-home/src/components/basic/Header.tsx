export default function Header() {
    return (
        <div className="flex flex-row w-full">
            <p className="text-5xl text-black font-bold mt-2">Smeow Home</p>
            <img
            src="/resources/images/CatPaw.png"
            alt={'paw icon'}
            className="rounded-lg h-14 max-w-md ml-4"
            />
        </div>
    )
}