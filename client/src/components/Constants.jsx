import { lazy } from "react";

// ALL GET INFO
export const Terminals = lazy(() =>
  import("../pages/sqr_section/sqr_terminal/Terminals")
);
export const Providers = lazy(() =>
  import("../pages/sqr_section/sqr_provider/Providers")
);
export const Retailers = lazy(() =>
  import("../pages/km_section/km_retailer/Retailers")
);
export const Terminal = lazy(() =>
  import("../pages/km_section/km_terminal/Terminal")
);
export const Users = lazy(() =>
  import("../pages/tijorat_section/tijorat_user/Users")
);
export const Sales = lazy(() =>
  import("../pages/tijorat_section/tijorat_sale/Sales")
);
export const Organization = lazy(() =>
  import("../pages/tijorat_section/tijorat_organization/Organization")
);
export const KmTerminal = lazy(() =>
  import("../pages/km_section/km_terminal_permission/KmTerminal")
);
export const PosRequests = lazy(() =>
  import("../pages/ckms_section/ckms_pos_requests/PosRequests")
);
