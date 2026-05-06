import {
  SchemaValidator,
  type Rule,
  type NotificationPattern,
  type ResultPattern,
} from "@felipe-lib/schema-local";

const mapFormNotification = (rule: {
  key: string | number | symbol;
  error: string;
}): NotificationPattern => ({
  success: false,
  key: String(rule.key),
  error: rule.error,
});

const resultMappers = <T>(
  data: T,
  notifications: NotificationPattern[],
): ResultPattern<T> => ({
  success: !notifications.length,
  notification: notifications,
  data,
});

export const makeValidator = <T extends object>(schema: Rule<T>[]) =>
  new SchemaValidator<T, NotificationPattern, ResultPattern<T>>({
    schema,
    notificationMappers: mapFormNotification,
    resultMappers,
  });
