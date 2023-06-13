export interface MatchEvent {
  participant?: string,
  country: string,
  against: string,
  eventId: number
  type_of_event?: string,
  player: string
  time: string
  extra_info?: string
}
