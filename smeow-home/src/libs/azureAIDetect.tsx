export default async function azureAIDetect({ img }: { img: FormData }) {
  const response = await fetch(
    `https://es-smeow-home.cognitiveservices.azure.com/vision/v3.2/detect?features=objects`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      cache: 'no-store',
      body: img,
    }
  )

  if (!response.ok) {
    if (response.status.toString().startsWith('4')) {
      return await response.json()
    }

    if (response.status === 500) {
      return {
        resultStatus: false,
        resultDetail: 'เกิดข้อผิดพลาดกับ server โปรดติดต่อผู้ดูแล',
      }
    }

    throw new Error('Cannot fetch lab data')
  }

  return await response.json()
}
