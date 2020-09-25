export interface LessonType {
  key: string;
  lessonInfo: LessonInfoType;
}

export interface LessonInfoType {
  lessonNum: number;
  contents: Array<LessonContentType>;
  file?: string;
  test: Array<LessonTestType>;
}

export interface LessonTestType {
  desc: string;
  score: number;
}

export interface LessonContentType {
  desc: string;
  isCompleted: boolean;
}
