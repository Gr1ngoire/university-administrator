type Constructor = {
  message?: string;
  cause?: unknown;
};

const DEFAULT_VALIDATION_ERROR_MESSAGE = "Validation error!";

class ValidationError extends Error {
  public cause: unknown;

  constructor({
    message = DEFAULT_VALIDATION_ERROR_MESSAGE,
    cause,
  }: Constructor) {
    super(message);
    this.cause = cause;
  }
}

export { ValidationError };
