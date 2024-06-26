type Game = {
  _id?: string
  title: string
  comment: string | null
  coverImageId: string
  developers: Array<string>
  finished: string | null
  finishedDate: string | null
  approximateDate: boolean | null
  igdbId: number
  igdbUrl: string
  keywords: Array<string>
  notPollable: string | null
  platform: string | null
  rating: number | null
  releaseYear: number | null
  timeSpent: number | null
  tss: boolean | null
  streamed: boolean | null
  vods: Array<string> | null
}

type RandomGame = Game & {
  selected?: number
}

type GameOptions = {
  id: number
  title: string
  year: number
  url: string
}
