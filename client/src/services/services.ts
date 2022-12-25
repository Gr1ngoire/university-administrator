import { ENV } from "@/common/enums/enums";
import { Http } from "./http/http.service";
import { Auth } from "./auth/auth.service";
import { axios as axiosService } from "./axios/axios";
import { Discipline } from "./discipline/discipline.service";
import { Faculty } from "./faculty/faculty.service";
import { Grant } from "./grant/grant.service";
import { Group } from "./group/group.service";
import { News } from "./news/news.service";
import { Teacher } from "./teacher/teacher.service";
import { Department } from "./department/department.service";
import { Schedule } from "./schedule/schedule.service";
import { Storage } from "./storage/storage.service";
import { Student } from "./student/student.service";
import { User } from "./user/user.service";

const apiPrefix = ENV.API.PATH;

const storage = new Storage();
const http = new Http({ storage, axiosService });

const auth = new Auth({ http, apiPrefix });
const department = new Department({ http, apiPrefix });
const discipline = new Discipline({ http, apiPrefix });
const faculty = new Faculty({ http, apiPrefix });
const grants = new Grant({ http, apiPrefix });
const group = new Group({ http, apiPrefix });
const news = new News({ http, apiPrefix });
const schedule = new Schedule({ http, apiPrefix });
const student = new Student({ http, apiPrefix });
const teacher = new Teacher({ http, apiPrefix });
const user = new User({ http, apiPrefix });

export {
  auth,
  department,
  discipline,
  faculty,
  grants,
  group,
  news,
  schedule,
  storage,
  student,
  teacher,
  user,
};
