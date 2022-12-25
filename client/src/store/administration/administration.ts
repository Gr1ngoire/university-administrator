import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import {
  department as departmentsService,
  discipline as disciplinesService,
  faculty as facultiesService,
  grant as grantsService,
  group as groupsService,
  schedule as schedulesService,
  student as studentsService,
  teacher as teachersService,
  user as usersService,
} from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateDepartmentRequestDto,
  DepartmentsGetAllItemResponseDto,
  UpdateDepartmentRequestParams,
  CreateDisciplineRequestDto,
  DisciplinesGetAllItemResponseDto,
  UpdateDisciplineRequestParams,
  CreateFacultyRequestDto,
  FacultiesGetAllItemResponseDto,
  UpdateFacultyRequestParams,
  CreateGroupRequestDto,
  GroupsGetAllItemResponseDto,
  UpdateGroupRequestParams,
  CreateScheduleRequestDto,
  SchedulesGetAllItemResponseDto,
  UpdateScheduleRequestParams,
  CreateStudentRequestDto,
  StudentsGetAllItemResponseDto,
  UpdateStudentRequestParams,
  CreateTeacherRequestDto,
  TeachersGetAllItemResponseDto,
  UpdateTeacherRequestParams,
  UsersGetAllItemAdminResponseDto,
  UpdateUserRequestParams,
  GrantsGetAllItemAdminResponseDto,
  CreateGrantRequestDto,
  UpdateGrantRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_DEPARTMENTS = "getAllDepartments",
  CREATE_DEPARTMENT = "createDepartment",
  UPDATE_DEPARTMENT = "updateDepartment",
  DELETE_DEPARTMENT = "deleteDepartment",
  GET_ALL_DISICPLINES = "getAllDisciplines",
  CREATE_DISCIPLINE = "createDiscipline",
  UPDATE_DISCIPLINE = "updateDiscipline",
  DELETE_DISCIPLINE = "deleteDiscipline",
  GET_ALL_FACULTIES = "getAllFaculties",
  CREATE_FACULTY = "createFaculty",
  UPDATE_FACULTY = "updateFaculty",
  DELETE_FACULTY = "deleteFaculty",
  GET_ALL_GRANTS = "getAllGrants",
  CREATE_GRANT = "createGrant",
  UPDATE_GRANT = "updateGrant",
  DELETE_GRANT = "deleteGrant",
  GET_ALL_GROUPS = "getAllGrants",
  CREATE_GROUP = "createGroup",
  UPDATE_GROUP = "updateGroup",
  DELETE_GROUP = "deleteGroup",
  GET_ALL_SCHEDULES = "getAllSchedules",
  CREATE_SCHEDULE = "createSchedule",
  UPDATE_SCHEDULE = "updateSchedule",
  DELETE_SCHEDULE = "deleteSchedule",
  GET_ALL_STUDENTS = "getAllStudents",
  CREATE_STUDENT = "createStudent",
  UPDATE_STUDENT = "updateStudent",
  DELETE_STUDENT = "deleteStudent",
  GET_ALL_TEACHERS = "getAllTeachers",
  CREATE_TEACHER = "createTeacher",
  UPDATE_TEACHER = "updateTeacher",
  DELETE_TEACHER = "deleteTeacher",
  GET_ALL_USERS = "getAllUsers",
  UPDATE_USER = "updateUser",
  DELETE_USER = "deleteUser",
}

enum Mutations {
  ADD_DEPARTMENTS = "addDepartments",
  ADD_DEPARTMENT = "addDepartment",
  UPDATE_DEPARTMENT = "updateDepartment",
  REMOVE_DEPARTMENT = "removeDepartment",
  CLEAR_DEPARTMENTS = "clearDepartments",
  ADD_DISCIPLINES = "addDisciplines",
  PUSH_DISCIPLINE = "addDiscipline",
  UPDATE_DISCIPLINE = "updateDiscipline",
  REMOVE_DISCIPLINE = "removeDiscipline",
  CLEAR_DISCIPLINES = "clearDisciplines",
  ADD_FACULTIES = "addFaculties",
  ADD_FACULTY = "addFaculty",
  UPDATE_FACULTY = "updateFaculty",
  REMOVE_FACULTY = "removeFaculty",
  CLEAR_FACULTIES = "clearFaculties",
  ADD_GRANTS = "addGrants",
  ADD_GRANT = "addGrant",
  UPDATE_GRANT = "updateGrant",
  REMOVE_GRANT = "removeGrant",
  CLEAR_GRANTS = "clearGrants",
  ADD_GROUPS = "addGroups",
  ADD_GROUP = "addGroup",
  UPDATE_GROUP = "updateGroup",
  REMOVE_GROUP = "removeGroup",
  CLEAR_GROUPS = "clearGroups",
  ADD_SCHEDULES = "addSchedules",
  ADD_SCHEDULE = "addSchedule",
  UPDATE_SCHEDULE = "updateSchedule",
  REMOVE_SCHEDULE = "removeSchedule",
  CLEAR_SCHEDULES = "clearSchedules",
  ADD_STUDENTS = "addStudents",
  ADD_STUDENT = "addStudent",
  UPDATE_STUDENT = "updateStudent",
  REMOVE_STUDENT = "removeStudent",
  CLEAR_STUDENTS = "clearStudents",
  ADD_TEACHERS = "addTeachers",
  ADD_TEACHER = "addTeacher",
  UPDATE_TEACHER = "updateTeacher",
  REMOVE_TEACHER = "removeTeacher",
  CLEAR_TEACHERS = "clearTeachers",
  ADD_USERS = "addUsers",
  ADD_USER = "addUser",
  UPDATE_USER = "updateUser",
  REMOVE_USER = "removeUser",
  CLEAR_USERS = "clearUsers",
}

const state: State = {
  departments: [],
  disciplines: [],
  faculties: [],
  grants: [],
  groups: [],
  schedules: [],
  students: [],
  teachers: [],
  users: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_DEPARTMENTS](
    state: State,
    newDepartments: DepartmentsGetAllItemResponseDto[]
  ) {
    state.departments = [...state.departments, ...newDepartments];
  },

  [Mutations.ADD_DEPARTMENT](
    state: State,
    newDepartment: DepartmentsGetAllItemResponseDto
  ) {
    state.departments.push(newDepartment);
  },

  [Mutations.UPDATE_DEPARTMENT](
    state: State,
    departmentToUpdate: DepartmentsGetAllItemResponseDto
  ) {
    state.departments = state.departments.map((department) => {
      if (department.id === departmentToUpdate.id) {
        return departmentToUpdate;
      }
      return department;
    });
  },

  [Mutations.REMOVE_DEPARTMENT](state: State, departmentId: number) {
    state.departments = state.departments.filter(
      (department) => department.id !== departmentId
    );
  },

  [Mutations.CLEAR_DEPARTMENTS](state: State) {
    state.departments = [];
  },

  [Mutations.ADD_DISCIPLINES](
    state: State,
    newDiscpiplines: DisciplinesGetAllItemResponseDto[]
  ) {
    state.disciplines = [...state.disciplines, ...newDiscpiplines];
  },

  [Mutations.PUSH_DISCIPLINE](
    state: State,
    newDiscilpline: DisciplinesGetAllItemResponseDto
  ) {
    state.disciplines.push(newDiscilpline);
  },

  [Mutations.UPDATE_DISCIPLINE](
    state: State,
    disciplineToUpdate: DisciplinesGetAllItemResponseDto
  ) {
    state.disciplines = state.disciplines.map((discipline) => {
      if (discipline.id === disciplineToUpdate.id) {
        return disciplineToUpdate;
      }
      return discipline;
    });
  },

  [Mutations.REMOVE_DISCIPLINE](state: State, disciplineId: number) {
    state.disciplines = state.disciplines.filter(
      (discipline) => discipline.id !== disciplineId
    );
  },

  [Mutations.CLEAR_DISCIPLINES](state: State) {
    state.disciplines = [];
  },

  [Mutations.ADD_FACULTIES](
    state: State,
    newFaculties: FacultiesGetAllItemResponseDto[]
  ) {
    state.faculties = [...state.faculties, ...newFaculties];
  },

  [Mutations.ADD_FACULTY](
    state: State,
    newFaculty: FacultiesGetAllItemResponseDto
  ) {
    state.faculties.push(newFaculty);
  },

  [Mutations.UPDATE_FACULTY](
    state: State,
    facultyToUpdate: FacultiesGetAllItemResponseDto
  ) {
    state.faculties = state.faculties.map((faculty) => {
      if (faculty.id === facultyToUpdate.id) {
        return facultyToUpdate;
      }
      return faculty;
    });
  },

  [Mutations.REMOVE_FACULTY](state: State, facultyId: number) {
    state.faculties = state.faculties.filter(
      (faculty) => faculty.id !== facultyId
    );
  },

  [Mutations.CLEAR_FACULTIES](state: State) {
    state.faculties = [];
  },

  [Mutations.ADD_GRANTS](
    state: State,
    newGrants: GrantsGetAllItemAdminResponseDto[]
  ) {
    state.grants = [...state.grants, ...newGrants];
  },

  [Mutations.ADD_GRANT](
    state: State,
    newGrant: GrantsGetAllItemAdminResponseDto
  ) {
    state.grants.push(newGrant);
  },

  [Mutations.UPDATE_GRANT](
    state: State,
    grantToUpdate: GrantsGetAllItemAdminResponseDto
  ) {
    state.grants = state.grants.map((grant) => {
      if (grant.id === grantToUpdate.id) {
        return grantToUpdate;
      }
      return grant;
    });
  },

  [Mutations.REMOVE_GRANT](state: State, grantId: number) {
    state.grants = state.grants.filter((grant) => grant.id !== grantId);
  },

  [Mutations.CLEAR_GRANTS](state: State) {
    state.grants = [];
  },

  [Mutations.ADD_GROUPS](
    state: State,
    newGroups: GroupsGetAllItemResponseDto[]
  ) {
    state.groups = [...state.groups, ...newGroups];
  },

  [Mutations.ADD_GROUP](state: State, newGroup: GroupsGetAllItemResponseDto) {
    state.groups.push(newGroup);
  },

  [Mutations.UPDATE_GROUP](
    state: State,
    groupToUpdate: GroupsGetAllItemResponseDto
  ) {
    state.groups = state.groups.map((group) => {
      if (group.id === groupToUpdate.id) {
        return groupToUpdate;
      }
      return group;
    });
  },

  [Mutations.REMOVE_GROUP](state: State, groupId: number) {
    state.groups = state.groups.filter((group) => group.id !== groupId);
  },

  [Mutations.CLEAR_GROUPS](state: State) {
    state.groups = [];
  },

  [Mutations.ADD_SCHEDULES](
    state: State,
    newSchedules: SchedulesGetAllItemResponseDto[]
  ) {
    state.schedules = [...state.schedules, ...newSchedules];
  },

  [Mutations.ADD_SCHEDULE](
    state: State,
    newSchedule: SchedulesGetAllItemResponseDto
  ) {
    state.schedules.push(newSchedule);
  },

  [Mutations.UPDATE_SCHEDULE](
    state: State,
    scheduleToUpdate: SchedulesGetAllItemResponseDto
  ) {
    state.schedules = state.schedules.map((schedule) => {
      if (schedule.id === scheduleToUpdate.id) {
        return scheduleToUpdate;
      }
      return schedule;
    });
  },

  [Mutations.REMOVE_SCHEDULE](state: State, scheduleId: number) {
    state.schedules = state.schedules.filter(
      (schedule) => schedule.id !== scheduleId
    );
  },

  [Mutations.CLEAR_SCHEDULES](state: State) {
    state.schedules = [];
  },

  [Mutations.ADD_STUDENTS](
    state: State,
    newStudents: StudentsGetAllItemResponseDto[]
  ) {
    state.students = [...state.students, ...newStudents];
  },

  [Mutations.ADD_STUDENT](
    state: State,
    newStudent: StudentsGetAllItemResponseDto
  ) {
    state.students.push(newStudent);
  },

  [Mutations.UPDATE_STUDENT](
    state: State,
    studentToUpdate: StudentsGetAllItemResponseDto
  ) {
    state.students = state.students.map((student) => {
      if (student.id === studentToUpdate.id) {
        return studentToUpdate;
      }
      return student;
    });
  },

  [Mutations.REMOVE_STUDENT](state: State, studentId: number) {
    state.students = state.students.filter(
      (student) => student.id !== studentId
    );
  },

  [Mutations.CLEAR_STUDENTS](state: State) {
    state.students = [];
  },

  [Mutations.ADD_TEACHERS](
    state: State,
    newTeachers: TeachersGetAllItemResponseDto[]
  ) {
    state.teachers = [...state.teachers, ...newTeachers];
  },

  [Mutations.ADD_TEACHER](
    state: State,
    newTeacher: TeachersGetAllItemResponseDto
  ) {
    state.teachers.push(newTeacher);
  },

  [Mutations.UPDATE_TEACHER](
    state: State,
    teacherToUpdate: TeachersGetAllItemResponseDto
  ) {
    state.teachers = state.teachers.map((teacher) => {
      if (teacher.id === teacherToUpdate.id) {
        return teacherToUpdate;
      }
      return teacher;
    });
  },

  [Mutations.REMOVE_TEACHER](state: State, teacherId: number) {
    state.teachers = state.teachers.filter(
      (teacher) => teacher.id !== teacherId
    );
  },

  [Mutations.CLEAR_TEACHERS](state: State) {
    state.teachers = [];
  },

  [Mutations.ADD_USERS](
    state: State,
    newUsers: UsersGetAllItemAdminResponseDto[]
  ) {
    state.users = [...state.users, ...newUsers];
  },

  [Mutations.UPDATE_USER](
    state: State,
    userToUpdate: UsersGetAllItemAdminResponseDto
  ) {
    state.users = state.users.map((user) => {
      if (user.id === userToUpdate.id) {
        return userToUpdate;
      }
      return user;
    });
  },

  [Mutations.REMOVE_USER](state: State, userId: number) {
    state.users = state.users.filter((user) => user.id !== userId);
  },

  [Mutations.CLEAR_USERS](state: State) {
    state.users = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_DEPARTMENTS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await departmentsService.getAll();

    commit(Mutations.CLEAR_DEPARTMENTS);
    commit(Mutations.ADD_DEPARTMENTS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    department: CreateDepartmentRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newDepartment = await departmentsService.create(department);

    commit(Mutations.ADD_DEPARTMENT, newDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateDepartmentRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedDepartment = await departmentsService.update(id, payload);

    commit(Mutations.UPDATE_DEPARTMENT, updatedDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    departmentId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await departmentsService.delete(departmentId);

    commit(Mutations.REMOVE_DEPARTMENT, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_DISICPLINES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await disciplinesService.getAll();

    commit(Mutations.CLEAR_DISCIPLINES);
    commit(Mutations.ADD_DISCIPLINES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    discipline: CreateDisciplineRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newDiscipline = await disciplinesService.create(discipline);

    commit(Mutations.PUSH_DISCIPLINE, newDiscipline);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateDisciplineRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedDiscipline = await disciplinesService.update(id, payload);

    commit(Mutations.UPDATE_DISCIPLINE, updatedDiscipline);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    disciplineId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await disciplinesService.delete(disciplineId);

    commit(Mutations.REMOVE_DISCIPLINE, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_FACULTIES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await facultiesService.getAll();

    commit(Mutations.CLEAR_FACULTIES);
    commit(Mutations.ADD_FACULTIES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    faculty: CreateFacultyRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newFaculty = await facultiesService.create(faculty);

    commit(Mutations.ADD_FACULTY, newFaculty);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateFacultyRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedFaculty = await facultiesService.update(id, payload);

    commit(Mutations.UPDATE_FACULTY, updatedFaculty);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    facultyId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await facultiesService.delete(facultyId);

    commit(Mutations.REMOVE_FACULTY, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_GRANTS]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await grantsService.getAll();

    commit(Mutations.CLEAR_GRANTS);
    commit(Mutations.ADD_GRANTS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_GRANT](
    { commit }: ActionContext<State, RootState>,
    grant: CreateGrantRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newGrant = await grantsService.create(grant);

    commit(Mutations.ADD_GRANT, newGrant);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_GRANT](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateGrantRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedGrant = await grantsService.update(id, payload);

    commit(Mutations.UPDATE_GRANT, updatedGrant);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_GRANT](
    { commit }: ActionContext<State, RootState>,
    grantId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await grantsService.delete(grantId);

    commit(Mutations.REMOVE_GRANT, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_GROUPS]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await groupsService.getAll();

    commit(Mutations.CLEAR_GROUPS);
    commit(Mutations.ADD_GROUPS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_GROUP](
    { commit }: ActionContext<State, RootState>,
    group: CreateGroupRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newGroup = await groupsService.create(group);

    commit(Mutations.ADD_GROUP, newGroup);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_GROUP](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateGroupRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedGroup = await groupsService.update(id, payload);

    commit(Mutations.UPDATE_GROUP, updatedGroup);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_GROUP](
    { commit }: ActionContext<State, RootState>,
    groupId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await groupsService.delete(groupId);

    commit(Mutations.REMOVE_GROUP, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_SCHEDULES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await schedulesService.getAll();

    commit(Mutations.CLEAR_SCHEDULES);
    commit(Mutations.ADD_SCHEDULES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    schedule: CreateScheduleRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newSchedule = await schedulesService.create(schedule);

    commit(Mutations.ADD_SCHEDULE, newSchedule);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateScheduleRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedSchedule = await schedulesService.update(id, payload);

    commit(Mutations.UPDATE_SCHEDULE, updatedSchedule);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    scheduleId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await schedulesService.delete(scheduleId);

    commit(Mutations.REMOVE_SCHEDULE, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_STUDENTS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await studentsService.getAll();

    commit(Mutations.CLEAR_STUDENTS);
    commit(Mutations.ADD_STUDENTS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    student: CreateStudentRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newStudent = await studentsService.create(student);

    commit(Mutations.ADD_STUDENT, newStudent);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateStudentRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedStudent = await studentsService.update(id, payload);

    commit(Mutations.UPDATE_STUDENT, updatedStudent);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    studentId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await studentsService.delete(studentId);

    commit(Mutations.REMOVE_STUDENT, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_TEACHERS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await teachersService.getAll();

    commit(Mutations.CLEAR_TEACHERS);
    commit(Mutations.ADD_TEACHERS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    teacher: CreateTeacherRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newTeacher = await teachersService.create(teacher);

    commit(Mutations.ADD_TEACHER, newTeacher);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateTeacherRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedTeacher = await teachersService.update(id, payload);

    commit(Mutations.UPDATE_TEACHER, updatedTeacher);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    teacherId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await teachersService.delete(teacherId);

    commit(Mutations.REMOVE_TEACHER, id);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.GET_ALL_USERS]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await usersService.getAll();

    commit(Mutations.CLEAR_USERS);
    commit(Mutations.ADD_USERS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_USER](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateUserRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedUser = await usersService.update(id, payload);

    commit(Mutations.UPDATE_USER, updatedUser);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_USER](
    { commit }: ActionContext<State, RootState>,
    userId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await usersService.delete(userId);

    commit(Mutations.REMOVE_USER, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const administration: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { administration };
