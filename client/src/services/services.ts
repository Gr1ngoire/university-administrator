import { ENV } from "@/common/enums/enums";
import { Http } from "./http/http.service";
import { Discipline } from "./discipline/discipline.service";
import { Faculty } from "./faculty/faculty.service";
import { Group } from "./group/group.service";
import { Teacher } from "./teacher/teacher.service";
import { Department } from "./department/department.service";
import { Student } from "./student/student.service";

const apiPrefix = ENV.API.PATH;

const http = new Http();
const department = new Department({ http, apiPrefix });
const discipline = new Discipline({ http, apiPrefix });
const faculty = new Faculty({ http, apiPrefix });
const group = new Group({ http, apiPrefix });
const student = new Student({ http, apiPrefix });
const teacher = new Teacher({ http, apiPrefix });

export { department, discipline, faculty, group, student, teacher };
