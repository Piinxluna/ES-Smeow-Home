import axios from 'axios'

export default async function azureAIDetect(img) {
  const response = await axios({
    // Endpoint to send files
    url: 'https://es-smeow-home.cognitiveservices.azure.com/vision/v3.2/detect?features=objects',
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key':
        '2eOBVUWfEkA5WIs1WEy9O8X8knX3Agb9dPEuROuApxd8FwnlFkpmJQQJ99AKACqBBLyXJ3w3AAAFACOGo2gX',
      'Content-Type': 'application/octet-stream',
    },

    // Attaching the form data
    data: img,
  })
    .then((res) => {
      // Handle the response from backend here
      if (res.status === 200) {
        return res.data.objects
      } else {
        console.log('Response status is not 200')
        return 'Error'
      }
    })
    .catch((err) => {
      // Catch errors if any
      console.log(err)
      return 'Error'
    })

  return response
}
