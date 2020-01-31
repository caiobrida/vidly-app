import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://f1039bc7cbc94817ad16ea83edaf659c@sentry.io/1764616"
  });
}

function log(error) {
  console.error(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
};
