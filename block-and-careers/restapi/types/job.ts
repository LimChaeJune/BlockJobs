export interface JobEntity {
  id: string;
  title: string;
  level: number;
  parentId: string;
  createAt: Date;
  updateAt: Date;
}
