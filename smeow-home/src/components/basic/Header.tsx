export default function Header(
    {
        className = '',
      }: {
        className?: string;
      }
) {
    
    return (
        <div className={`flex flex-row justify-items-center items-center last:w-full ${className}`}>
            <p className={`text-4xl text-black font-extrabold mt-2 `}>Smeow Home</p>
            <img
            src="/resources/images/CatPaw.png"
            alt={'paw icon'}
            className="rounded-lg h-16 max-w-md ml-4"
            />
        </div>
    )
}