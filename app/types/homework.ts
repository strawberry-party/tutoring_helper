export interface AssignListType {
  assigns: Array<AssignType>;
}
export interface AssignType {
  id: string;
  title: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: boolean;
  status: number;
  subAssigns: Array<SubAssignType>;
}
export interface SubAssignType {
  text: string;
  isCompleted: boolean;
  id: string;
}
