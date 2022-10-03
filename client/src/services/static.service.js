import { GET } from "./api.service";

export const GetBranches = () => {
  return GET("/api/v1/branch");
};
