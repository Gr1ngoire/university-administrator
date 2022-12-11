import { Http } from "./http/http.service";
import { Disciplines } from "./disciplines/disciplines.service";
import { ENV } from "@/common/enums/enums";

const apiPrefix = ENV.API.PATH;

const http = new Http();
const disciplines = new Disciplines({ http, apiPrefix });

export { disciplines };
