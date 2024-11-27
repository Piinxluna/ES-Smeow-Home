import Button from '@/components/basic/Button'

export default function BacktoHomeButton({
    className = '',
  }: {
    className?: string;
}) {
    return (
        <Button variant='secondary' href='/' className={className}>Back to Home</Button>
    )
}