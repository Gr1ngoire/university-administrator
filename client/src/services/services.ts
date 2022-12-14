import { ENV } from "@/common/enums/enums";
import { Http } from "./http/http.service";
import { Discipline } from "./discipline/discipline.service";
import { Faculty } from "./faculty/faculty.service";
import { Teacher } from "./teacher/teacher.service";
import { Department } from "./department/department.service";

const apiPrefix = ENV.API.PATH;

const http = new Http();
const department = new Department({ http, apiPrefix });
const discipline = new Discipline({ http, apiPrefix });
const faculty = new Faculty({ http, apiPrefix });
const teacher = new Teacher({ http, apiPrefix });

export { department, discipline, faculty, teacher };
