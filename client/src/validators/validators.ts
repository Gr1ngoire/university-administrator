import { Department } from "./department/department.validator";
import { Discipline } from "./discipline/discipline.validator";
import { Faculty } from "./faculty/faculty.validator";
import { Group } from "./group/group.validator";
import { News } from "./news/news.validator";
import { Schedule } from "./schedule/schedule.validator";
import { User } from "./user/user.validator";

const department = new Department();
const discipline = new Discipline();
const faculty = new Faculty();
const group = new Group();
const news = new News();
const schedule = new Schedule();
const user = new User();

export { department, discipline, faculty, group, news, schedule, user };
