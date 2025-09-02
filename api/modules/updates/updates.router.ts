import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, } from "stoker/openapi/helpers";

// import {
//   CheckUpdateRequestSchema,
//   CheckUpdateResponseSchema,
//   ErrorSchema,
//   ListVersionsResponseSchema,
//   SuccessResponseSchema,
// } from "#/db/";

import { createRouter } from "../../lib/create-app";
import {
  handleCheckUpdate,
  handleDownloadLocalUpdate,
  handleListVersions,
  handleUploadUpdate,
} from "./updates.controller";

const tags = ["Upates"];

// --- Route Definitions ---

const checkUpdateRoute = createRoute({
  path: "/updates/check",
  method: "post",
  tags,
  // request: {
  //   body: jsonContentRequired(CheckUpdateRequestSchema, "The user to create"),
  // },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.string(),
      "The updated user",
    ),
  },
});
const uploadUpdateRoute = createRoute({
  method: "post",
  path: "/updates/upload",
  tags: ["Updates"],
  summary: "Upload a new application version (APK or OTA bundle)",
  request: {
    body: { content: { "multipart/form-data": { schema: z.object({}) } } },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.boolean(),
      "Upload success response",
    ),
    400: {
      description: "Bad Request",
      content: { "application/json": { schema: z.string() } },
    },
  },
});

const downloadLocalUpdateRoute = createRoute({
  method: "get",
  path: "/updates/download/{filename}",
  tags: ["Updates"],
  summary: "Download an update file (for local development only)",
  request: { params: z.object({ filename: z.string() }) },
  responses: {
    200: { description: "Application file (APK or ZIP)" },
    404: {
      description: "Not Found",
      content: { "application/json": { schema: z.string() } },
    },
  },
});

const listVersionsRoute = createRoute({
  method: "get",
  path: "/updates/versions/{appId}/{platform}",
  tags: ["Updates"],
  summary: "List all available versions for an app and platform",
  request: { params: z.object({ appId: z.string(), platform: z.string() }) },
  responses: {
    200: {
      description: "List of versions",
      content: {
        "application/json": { schema: z.array(z.string()) },
      },
    },
    400: {
      description: "Bad Request",
      content: { "application/json": { schema: z.string() } },
    },
  },
});

// --- Register Routes ---
const routes = createRouter()
  .openapi(checkUpdateRoute, handleCheckUpdate as any)
  .openapi(uploadUpdateRoute, handleUploadUpdate as any)
  .openapi(downloadLocalUpdateRoute, handleDownloadLocalUpdate)
  .openapi(listVersionsRoute, handleListVersions as any);
//
export default routes;
