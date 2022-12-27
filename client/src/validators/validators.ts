import { Department } from "./department/department.validator";
import { Discipline } from "./discipline/discipline.validator";
import { Faculty } from "./faculty/faculty.validator";
import { FaqMessage } from "./faq-message/faq-message.validator";
import { Group } from "./group/group.validator";
import { News } from "./news/news.validator";
import { Schedule } from "./schedule/schedule.validator";
import { UserSignIn } from "./user/user-sign-in.validator";
import { UserSignUp } from "./user/user-sign-up.validator";
import { UserUpdate } from "./user/user-update.validator";

const department = new Department();
const discipline = new Discipline();
const faculty = new Faculty();
const faqMessage = new FaqMessage();
const group = new Group();
const news = new News();
const schedule = new Schedule();
const userUpdate = new UserUpdate();
const userSignIn = new UserSignIn();
const userSignUp = new UserSignUp();

export {
  department,
  discipline,
  faqMessage,
  faculty,
  group,
  news,
  schedule,
  userSignIn,
  userSignUp,
  userUpdate,
};
