import { ActionTypesRequests } from "../../utils/typesGlobals/type.server";

export type ResponseLoginAction =
  | {
      type: ActionTypesRequests.ERROR_VALIDATION;
      errors: {
        email: string[] | undefined;
        password: string[] | undefined;
      };
    }
  | {
      type: ActionTypesRequests.SUCCESS;
      data: {
        message: string;
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

export type handle = {
  title: string;
  createAccount: string;
};
