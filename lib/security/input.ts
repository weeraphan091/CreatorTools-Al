const CONTROL_CHARACTERS_REGEX = /[\u0000-\u001F\u007F]/g;
const MULTIPLE_SPACES_REGEX = /\s+/g;
const DANGEROUS_CHARS_REGEX = /[<>{}`$\\]/g;

const SUSPICIOUS_PATTERN_REGEXES = [
  /<\s*script/gi,
  /javascript:/gi,
  /onerror\s*=/gi,
  /onload\s*=/gi,
  /union\s+select/gi,
  /drop\s+table/gi,
  /insert\s+into/gi,
  /delete\s+from/gi,
  /\.\.\//g,
  /\$where/gi,
  /\$ne/gi,
];

type SanitizeOptions = {
  maxLength?: number;
};

export function sanitizeUserText(input: string, options: SanitizeOptions = {}) {
  const maxLength = options.maxLength ?? 280;
  return input
    .normalize("NFKC")
    .replace(CONTROL_CHARACTERS_REGEX, " ")
    .replace(DANGEROUS_CHARS_REGEX, "")
    .replace(MULTIPLE_SPACES_REGEX, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeTopicInput(input: string) {
  return sanitizeUserText(input, { maxLength: 280 });
}

export function sanitizeToolInput(input: string) {
  return sanitizeUserText(input, { maxLength: 120 });
}

export function sanitizeEmailInput(input: string) {
  return sanitizeUserText(input, { maxLength: 254 }).toLowerCase();
}

export function containsSuspiciousInput(input: string) {
  return SUSPICIOUS_PATTERN_REGEXES.some((regex) => regex.test(input));
}

export function isValidTopicInput(input: string) {
  return input.length >= 3 && input.length <= 280;
}

export function isValidEmailInput(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}
