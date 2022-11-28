type UpdateScheduleRequestDto = {
  name: string;
  teacherId: number;
  disciplineId: number;
  groupId: number;
  time: string;
  classroom: string;
};

export { type UpdateScheduleRequestDto };
