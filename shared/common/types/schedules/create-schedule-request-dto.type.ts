type CreateScheduleRequestDto = {
  teacherId: number;
  disciplineId: number;
  groupId: number;
  time: string;
  classroom: string;
};

export { type CreateScheduleRequestDto };
