CORS & Axios setup

Summary
- Frontend uses `axiosInstance` at `src/lib/axios.js` with `withCredentials: true` to send/receive httpOnly cookies.
- Backend sets the auth cookie and must use `SameSite=None` and `Secure=true` in production for cross-site cookies.

Frontend (what to set)
- Add `VITE_API_URL` to Vercel or local env to point to your backend, e.g. `https://education-server-six.vercel.app`.
- The app defaults to `https://education-server-six.vercel.app` when `VITE_API_URL` is not set.

Backend (what to set)
- Ensure `NODE_ENV=production` on the production server (Vercel does this automatically).
- Optionally set `COOKIE_SECURE=true` if you want to force secure cookie behavior regardless of NODE_ENV.

What changed in repository
- `Education/src/lib/axios.js`: improved axios instance, interceptors and `setApiBase()` helper.
- `EducationServer/src/lib/utils.js`: cookie options updated to use `SameSite=None` & `Secure` in production and `httpOnly: true`.
- `EducationServer/src/controllers/auth.controller.js`: `logout` now clears cookie with the same options.

Quick test (browser)
1. Open the frontend deployed URL.
2. Login; open DevTools → Application → Cookies and verify cookie `token` is set for the backend domain and has `SameSite=None` and `Secure`.
3. Call a protected API from frontend; it should succeed if cookie present.

Quick test (curl)
- Cookies are httpOnly; use curl with `-c`/`-b` to persist cookies:

```bash
# login and save cookies
curl -c cookies.txt -H "Content-Type: application/json" -d '{"email":"you@example.com","password":"pass"}' https://education-server-six.vercel.app/auth/login

# call protected endpoint using saved cookie
curl -b cookies.txt https://education-server-six.vercel.app/user/myCourses
```

Notes
- If you rely on token-in-header flows instead of cookies, update `axiosInstance` to attach `Authorization` headers from storage.
- If you need a refresh-token endpoint, add it server-side and wire it into the axios interceptor's refresh logic.

Contact me if you want me to add a refresh-token flow or to update specific API calls to use header tokens.
