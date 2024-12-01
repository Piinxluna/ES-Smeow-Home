import { useEffect, useState } from 'react'

export default function LiveWithAIDetect() {
  const [imgURL, setImgURL] = useState<string>()
  const [syncTime, setSyncTime] = useState<Date>()

  useEffect(() => {
    getCurrentImg()
  }, [])

  const getCurrentImg = async () => {
    const response = await fetch('/api/screenshot')
    const blob = await response.blob()
    const imageURL = URL.createObjectURL(blob)

    const form = new FormData()
    form.append('blob', blob)

    setImgURL(imageURL)
    setSyncTime(new Date())
  }

  return (
    <div>
      <img src={imgURL} alt='Live image' />
      <p>Sync date : {syncTime?.toString()}</p>
    </div>
  )
}
