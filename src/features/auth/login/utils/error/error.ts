import axios from "axios";

type ApiError = {
  message?: string;
  detail?: string;
};

export default function getLoginErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const status = error.response?.status;
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data?.detail;

    if (serverMessage) return serverMessage;

    switch (status) {
      case 400:
      case 401:
        return "Email or password is incorrect.";

      case 403:
        return "You are not authorized to access this account.";

      case 404:
        return "Account not found.";

      case 500:
      case 502:
      case 503:
        return "Server error. Please try again later.";

      default:
        if (!error.response) {
          return "Unable to connect to the server.";
        }

        return "Something went wrong. Please try again.";
    }
  }

  return "An unexpected error occurred.";
}
