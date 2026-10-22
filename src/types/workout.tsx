export type Workout = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  equipment: string;
  difficulty: string;
  sets: string | number;
  reps: string | number;
  duration: number;
  calories: number;
  rating: number | string;
  instructions: string[];
};
