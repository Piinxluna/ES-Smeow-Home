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
}

interface Live {
  image: string
  yyncTime: string
}

interface Water {
  totalLastHour: number
  totalToday: number
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
