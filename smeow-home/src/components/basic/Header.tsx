export default function Header(
    {
        className = '',
        textSize ='text-4xl',
        pawSize = 'h-16',
      }: {
        className?: string;
        textSize?: string;
        pawSize?: string;
      }
) {
    
    return (
        <div className={`flex flex-row justify-items-center items-center last:w-full ${className}`}>
            <p className={`${textSize} text-black font-extrabold mt-2 `}>Smeow Home</p>
            <img
            src="/resources/images/CatPaw.png"
            alt={'paw icon'}
            className={`rounded-lg ${pawSize} max-w-md ml-4`}
            />
        </div>
    )
}