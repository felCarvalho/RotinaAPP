import { ActionTypesRequests } from "../../utils/typesGlobals/type.server";

export type ResponseCreateRotinaAction =
  | {
      type: ActionTypesRequests.SUCCESS;
      data: { message: string };
    }
  | {
      type: ActionTypesRequests.ERROR_VALIDATION;
      errors: {
        title: string[] | undefined;
        description: string[] | undefined;
      };
    }
  | {
      type: ActionTypesRequests.ERROR_INTERNAL;
      data: {
        message: string;
        error: string;
        status: number;
      };
    }
  | {
      type: ActionTypesRequests.ERROR_SERVER;
      data: {
        error: string;
        message: string;
        statusCode: number;
      };
    };
