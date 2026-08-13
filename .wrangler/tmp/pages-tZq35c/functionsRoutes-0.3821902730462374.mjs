import { onRequestDelete as __api_dpt_js_onRequestDelete } from "D:\\e-voting\\functions\\api\\dpt.js"
import { onRequestGet as __api_dpt_js_onRequestGet } from "D:\\e-voting\\functions\\api\\dpt.js"
import { onRequestPost as __api_dpt_js_onRequestPost } from "D:\\e-voting\\functions\\api\\dpt.js"
import { onRequestPut as __api_dpt_js_onRequestPut } from "D:\\e-voting\\functions\\api\\dpt.js"
import { onRequestGet as __api_hasil_js_onRequestGet } from "D:\\e-voting\\functions\\api\\hasil.js"
import { onRequestPost as __api_hasil_js_onRequestPost } from "D:\\e-voting\\functions\\api\\hasil.js"
import { onRequestPost as __api_login_js_onRequestPost } from "D:\\e-voting\\functions\\api\\login.js"
import { onRequestDelete as __api_paslon_js_onRequestDelete } from "D:\\e-voting\\functions\\api\\paslon.js"
import { onRequestGet as __api_paslon_js_onRequestGet } from "D:\\e-voting\\functions\\api\\paslon.js"
import { onRequestPost as __api_paslon_js_onRequestPost } from "D:\\e-voting\\functions\\api\\paslon.js"
import { onRequestPut as __api_paslon_js_onRequestPut } from "D:\\e-voting\\functions\\api\\paslon.js"
import { onRequestGet as __api_stats_js_onRequestGet } from "D:\\e-voting\\functions\\api\\stats.js"
import { onRequestPost as __api_vote_js_onRequestPost } from "D:\\e-voting\\functions\\api\\vote.js"

export const routes = [
    {
      routePath: "/api/dpt",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_dpt_js_onRequestDelete],
    },
  {
      routePath: "/api/dpt",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_dpt_js_onRequestGet],
    },
  {
      routePath: "/api/dpt",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_dpt_js_onRequestPost],
    },
  {
      routePath: "/api/dpt",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_dpt_js_onRequestPut],
    },
  {
      routePath: "/api/hasil",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_hasil_js_onRequestGet],
    },
  {
      routePath: "/api/hasil",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_hasil_js_onRequestPost],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_login_js_onRequestPost],
    },
  {
      routePath: "/api/paslon",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_paslon_js_onRequestDelete],
    },
  {
      routePath: "/api/paslon",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_paslon_js_onRequestGet],
    },
  {
      routePath: "/api/paslon",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_paslon_js_onRequestPost],
    },
  {
      routePath: "/api/paslon",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_paslon_js_onRequestPut],
    },
  {
      routePath: "/api/stats",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_stats_js_onRequestGet],
    },
  {
      routePath: "/api/vote",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_vote_js_onRequestPost],
    },
  ]