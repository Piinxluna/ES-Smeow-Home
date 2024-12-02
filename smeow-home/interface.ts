interface EatingStatus {
  isAte: boolean
  isEating: boolean
  lastEatTime: string
  lastFeedTime: string
  totalLastMeal: number
  totalToday: number
}

interface DrinkingStatus {
  totalLastHour: number
  totalToday: number
}

interface Weather {
  humidity: number
  temperature: number
  airQuality: number
}

interface Live {
  image: string
  syncTime: string
}

interface Water {
  lastHourPercent: number
  lastDayPercent: number
  waterLeft: number
}

interface Control {
  feeding: FeedingControl
  laserMode: number
  openFood: boolean
  openWater: boolean
}

interface FeedingControl {
  feedingTime: string[] // will change later
  isAutoMode: boolean
}

interface AzureImageDetect {
  objects: AzureImageDetectObject[]
  requestId: string
  metadata: {
    height: number
    width: number
    format: string
  }
  modelVersion: string
}

interface AzureImageDetectObject {
  rectangle: Rectangle
  object: string
  confidence: number
  parent: any
}

interface Rectangle {
  x: number
  y: number
  w: number
  h: number
}

interface Dimension {
  w: number
  h: number
}
