import { ActionTypesRequests } from "../../utils/typesGlobals/type.server";

export type taskLoader = {
  data: {
    publicId: string;
    title: string;
    description: string;
    category: string;
    status: string;
    createdAt: Date;
  }[];
};
