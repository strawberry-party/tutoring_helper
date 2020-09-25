import { StudentType } from "./student";

export interface TutorType {
  studentArray?: Array<StudentType>;
  name: string;
  studentNum: number;
}