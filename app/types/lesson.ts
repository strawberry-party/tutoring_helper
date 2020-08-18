export interface LessonType {
  lessonNum: number;
  contents: Map<string, LessonContentType>;
  file?: string;
  test?: Array<TestType>;
}

export interface TestType {
  desc: string;
  score: number;
}

export interface LessonContentType {
  text: string;
  isCompleted: boolean;
}
