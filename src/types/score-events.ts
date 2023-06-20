export interface ScoreEvent {
  participant: string,
  type_of_event: string,
  player: string
}

export interface MatchScoreEvent extends ScoreEvent {
  country: string,
  against: string,
}

export interface AssistScoreEvent extends ScoreEvent {
  assists: number
}

export interface Score {
  goals: number,
  bookings: number,
  assists: number,
  clean_sheets: number
}
