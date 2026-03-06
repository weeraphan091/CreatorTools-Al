type LogLevel = "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

function write(level: LogLevel, message: string, meta: LogMeta = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  const line = JSON.stringify(payload);
  if (level === "error") {
    console.error(line);
    return;
  }
  if (level === "warn") {
    console.warn(line);
    return;
  }
  console.log(line);
}

export function logInfo(message: string, meta: LogMeta = {}) {
  write("info", message, meta);
}

export function logWarn(message: string, meta: LogMeta = {}) {
  write("warn", message, meta);
}

export function logError(message: string, meta: LogMeta = {}) {
  write("error", message, meta);
}
