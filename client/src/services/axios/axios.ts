import axiosLibInstance from "axios";

import type { AxiosInstance } from "@/common/types/types";
import { ENV } from "@/common/enums/enums";

const axios: AxiosInstance = axiosLibInstance.create({
  baseURL: ENV.API.PATH,
});

export { axios };
