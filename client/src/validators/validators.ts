import { Department } from "./department.validator";
import { Discipline } from "./discipline.validator";
import { Faculty } from "./faculty.validator";
import { Group } from "./group.validator";
import { Teacher } from "./teacher.validator";

const department = new Department();
const discipline = new Discipline();
const faculty = new Faculty();
const group = new Group();
const teacher = new Teacher();

export { department, discipline, faculty, group, teacher };
