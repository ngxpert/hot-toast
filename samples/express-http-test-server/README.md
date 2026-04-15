# Express HTTP test server

Small API used to manually verify `hotToastHttpInterceptor` and `provideHotToastHttpInterceptor()` (status ignores, messages, headers).

## Run

From the repository root (first time only install deps):

```bash
npm run sample:http-test-server:install
npm run sample:http-test-server
```

Or from this folder:

```bash
npm install
npm start
```

Default port is **4000** (`PORT=5000 npm start` to change).

## Try with curl

```bash
curl -i http://localhost:4000/api/server-error
curl -i http://localhost:4000/api/unauthorized
```

## Try from the Angular app

1. Start this server (`npm run sample:http-test-server`).
2. Start the docs app: `npm start` (usually http://localhost:4200).
3. Open the in-app **sample server** page: http://localhost:4200/http-interceptor-sample (uses `environment.sampleHttpTestServerUrl`, default `http://localhost:4000`).

Or in the browser DevTools console:

```js
fetch('http://localhost:4000/api/server-error').catch(() => {});
```

You should see an error toast (unless that status is in `ignoreStatuses`).

4. Optional: call `GET http://localhost:4000/api/skip-toast-header` with header `X-Skip-Toast: 1` to test `skipRequest` / `shouldIgnore` in your interceptor config.

## Endpoints

| Method | Path | Status | Notes |
|--------|------|--------|--------|
| GET | `/api/health` | 200 | JSON `{ ok: true }` |
| GET | `/api/unauthorized` | 401 | JSON message |
| GET | `/api/forbidden` | 403 | Plain text |
| GET | `/api/not-found` | 404 | JSON |
| GET | `/api/bad-request` | 400 | Plain text |
| GET | `/api/conflict` | 409 | JSON |
| GET | `/api/server-error` | 500 | JSON |
| GET | `/api/teapot` | 418 | Plain text |
| GET | `/api/network-style` | — | Closes socket (client network error) |
| POST | `/api/echo` | 200 | Echoes JSON body |

Open http://localhost:4000/ for an HTML index of these routes.
