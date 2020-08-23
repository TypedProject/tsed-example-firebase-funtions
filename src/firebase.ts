import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import * as functions from "firebase-functions";
import {Server} from "./Server";

let platform: PlatformExpress;

async function bootstrap() {
  try {
    $log.debug("Start server...");
    platform = await PlatformExpress.bootstrap(Server);
  } catch (er) {
    $log.error(er);
  }
}

const promise = bootstrap();

export const app = functions.https.onRequest(async (req, res) => {
  await promise;

  // GET Express application
  platform.app.raw(req, res);
});
