import { ZoovuFacade } from "@zoovu/exd-api";

export function getContextValue(zoovuFacade: ZoovuFacade, variableName: string, type: "boolean" | "string"): boolean | string {
  const readContextValue = (zoovuFacade as unknown as ZoovuFacade).useContext().get(variableName);

  if (type === "boolean") {
    const value = readContextValue?.value || readContextValue?.defaultValue;
    const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
    return parsedValue;
  } else if (type === "string") {
    return readContextValue?.value || readContextValue?.defaultValue;
  }
}
