import { FunctionsErrorCode } from 'firebase-functions/lib/providers/https'

export const CODE: {
  ABORTED: FunctionsErrorCode
  ALREADY_EXISTS: FunctionsErrorCode
  CANCELLED: FunctionsErrorCode
  DATA_LOSS: FunctionsErrorCode
  DEADLINE_EXCEEDED: FunctionsErrorCode
  FAILED_PRECONDITION: FunctionsErrorCode
  INTERNAL: FunctionsErrorCode
  INVALID_ARGUMENT: FunctionsErrorCode
  NOT_FOUND: FunctionsErrorCode
  OK: FunctionsErrorCode
  OUT_OF_RANGE: FunctionsErrorCode
  PERMISSION_DENIED: FunctionsErrorCode
  RESOURCE_EXHAUSTED: FunctionsErrorCode
  UNAUTHENTICATED: FunctionsErrorCode
  UNAVAILABLE: FunctionsErrorCode
  UNIMPLEMENTED: FunctionsErrorCode
  UNKNOWN: FunctionsErrorCode
} = {
  ABORTED: 'aborted',
  ALREADY_EXISTS: 'already-exists',
  CANCELLED: 'cancelled',
  DATA_LOSS: 'data-loss',
  DEADLINE_EXCEEDED: 'deadline-exceeded',
  FAILED_PRECONDITION: 'failed-precondition',
  INTERNAL: 'internal',
  INVALID_ARGUMENT: 'invalid-argument',
  NOT_FOUND: 'not-found',
  OK: 'ok',
  OUT_OF_RANGE: 'out-of-range',
  PERMISSION_DENIED: 'permission-denied',
  RESOURCE_EXHAUSTED: 'resource-exhausted',
  UNAUTHENTICATED: 'unauthenticated',
  UNAVAILABLE: 'unavailable',
  UNIMPLEMENTED: 'unimplemented',
  UNKNOWN: 'unknown'
}
