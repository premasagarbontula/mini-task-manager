import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors;

    if (errors?.length) {
      return errors.map((err: { msg: string }) => err.msg).join("\n");
    }

    return error.response?.data?.message ?? "Something went wrong";
  }

  return "Unexpected error occurred";
};
