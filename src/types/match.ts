export interface Match {
  id: number
  location: string
  status: string
  attendance: number
  stage_name: string
  home_team_country: string
  away_team_country: string
  datetime: Date
  winner: string
  winner_code: string
  home_team: TeamScore
  away_team: TeamScore
  weather: Weather
  time: string
  detailed_time: DetailedTime
  officials: Official[]
  home_team_events: PlayerEvent[]
  away_team_events: PlayerEvent[]
  home_team_lineup: Lineup
  away_team_lineup: Lineup
  home_team_statistics: Statistics
  away_team_statistics: Statistics
  last_checked_at: Date
  last_changed_at: Date
}

export interface TeamScore {
  country: string
  name: string
  goals: number
  penalties: number
}

export interface Weather {
  humidity: number
  temp_celsius: number
  temp_farenheit: number
  wind_speed: number
  description: string
}

export interface DetailedTime {
  current_time: string
  first_half_time?: string
  first_half_extra_time?: string
  second_half_time?: string
  second_half_extra_time?: string
}

export interface Official {
  name: string
  role: string
  country: string
}

export interface PlayerEvent {
  id: number
  type_of_event: string
  player: string
  time: string
  extra_info?: string
}

export interface Lineup {
  country: string
  tactics: string
  starting_eleven: Player[]
  substitutes: Player[]
}

export interface Player {
  name: string
  shirt_number: number
  position: string
}

export interface Statistics {
  country?: string
  attempts_on_goal?: string
  on_target?: string
  off_target?: string
  blocked?: string
  corners?: string
  offsides?: string
  ball_possession?: string
  pass_accuracy?: string
  num_passes?: string
  passes_completed?: string
  distance_covered?: string
  tackles?: string
  clearances?: string
  yellow_cards?: string
  red_cards?: string
  fouls_committed?: string
}
