// export type Tracker = {
//   id: number;
//   date: string;
//   calories_eaten?: number;
//   exercise_burn?: number;
//   steps?: number;
//   weight?: number;
//   notes?: string;
// };

export interface Tracker {
  id: number;
  user_id: string;
  date: string;
  calories_eaten: number;
  exercise_burn: number;
  steps: number;
  weight: number;
  notes: string;
}