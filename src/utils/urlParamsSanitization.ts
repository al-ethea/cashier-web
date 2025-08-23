
export default function urlParamsSanitization(params: URLSearchParams, allowedKeys: string[]) {

  const sanitized = new URLSearchParams();

  for (const [key, value] of params) {
    if (allowedKeys.includes(key) && value.trim().length > 0) {
      // Basic sanitization - remove dangerous characters
      const cleanValue = value.replace(/[<>'"&]/g, '');
      sanitized.set(key, cleanValue);
    }
  }

  return sanitized;
}
