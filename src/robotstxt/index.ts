import { RobotsPolicy, RobotsConfig } from "../types";
import { getRobotsText } from "./utils";

const defaultPolicies: RobotsPolicy[] = [
  {
    type: "userAgent",
    value: "*",
  },
  {
    type: "allow",
    value: "/",
  },
];

export async function generateRobotsTxt(
  policies: RobotsPolicy[] = [],
  { appendOnDefaultPolicies = true, headers }: RobotsConfig = {}
) {
  const policiesToUse = appendOnDefaultPolicies
    ? [...defaultPolicies, ...policies]
    : policies;
  const robotText = await getRobotsText(policiesToUse);
  return new Response(robotText, {
    headers: {
      ...headers,
      "Content-Type": "text/plain",
      "Content-Length": String(Buffer.byteLength(robotText)),
    },
  });
}
