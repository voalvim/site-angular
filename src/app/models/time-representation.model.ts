export interface TimeRepresentation {
  absolute: number; // total (e.g. total months since start)
  relative: number; // clock-like (e.g. 1–12 for months, 1–31 for days, etc)
}