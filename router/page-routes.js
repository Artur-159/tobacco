import Login from "../pages/login/login";
import Users from "../pages/users/users";
import Personal from "../pages/users/component/personal/personal";
import EditUser from "../pages/users/component/edit-user/edit-user";
import Detail from "../pages/users/component/detail/detail";
import City from "../pages/city/city";
import EditCity from "../pages/city/components/edit/edit";
import Company from "../pages/company/company";
import EditCompany from "../pages/company/components/edit/edit";
import CreateCompany from "../pages/company/components/create/create";
import DetailCompany from "../pages/company/components/detail/detail";
import PartnerApplicant from "../pages/partner/partner-applicant";
import PartnerAuthorized from "../pages/partner/partner-authorized";
import EditPartner from "../pages/partner/components/edit/edit";
import CreatePartner from "../pages/partner/components/create/create";
import CreateAdmin from "../pages/users/component/create-admin/create-admin";
import TradeMark from "../pages/trademark/trademark";
import EditTradeMark from "../pages/trademark/components/edit/edit";
import CreateTradeMark from "../pages/trademark/components/create/create";
import DocType from "../pages/doc-type/doc-type";
import LedgerDocs from "../pages/ledger-docs/ledger-docs";
import OperationType from "../pages/operation-type/operation-type";
import Operations from "../pages/operations/operations";
import Objections from "../pages/objections/objections";
import CreateObjection from "../pages/objections/components/create/create";
import EditObjection from "../pages/objections/components/edit/edit";
import ObjectionDetail from "../pages/objections/components/detail/detail";
import AttachCountry from "../components/attach-country/attach-country";
import TrademarkDetail from "../pages/trademark/components/detail/detail";
import PartnerDetail from "../pages/partner/components/detail/detail";
import Info from "../pages/info/info";
import EditAttachCountry from "../components/attach-country/edit-attach-country";
import UseTrademark from "../pages/use-trademark/use-trademark";
import EditUseTrademark from "../pages/use-trademark/components/edit/edit";
import CreateUseTrademark from "../pages/use-trademark/components/create/create";

export const superRouters = [
  {
    name: "Օգտատերեր",
    path: "/users",
    element: <Users />,
    icon: "/icons/users.svg",
    children: [
      {
        path: "users/create_user",
        element: <CreateAdmin />,
      },
      {
        path: "users/:userId",
        element: <EditUser />,
      },
      {
        path: "users/detail/:detailId",
        element: <Detail />,
      },
      {
        path: "/personal",
        element: <Personal />,
      },
    ],
  },
  {
    name: "Այլ տեղեկություններ",
    path: "/info",
    element: <Info />,
    icon: "/icons/map.svg",
  },

  {
    name: "Երկրներ",
    path: "/city",
    element: <City />,
    icon: "/icons/map.svg",
    children: [
      {
        path: "city/:userId",
        element: <EditCity />,
      },
    ],
  },
  {
    name: "Իմ Ընկերությունները",
    path: "/company",
    element: <Company />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "company/:id",
        element: <EditCompany />,
      },
      {
        path: "company/detail/:id",
        element: <DetailCompany />,
      },
      {
        path: "company/create",
        element: <CreateCompany />,
      },
    ],
  },
  {
    name: "Հայտատու անձիք",
    path: "/partner-applicant",
    element: <PartnerApplicant />,
    icon: "/icons/applicants.svg",
    children: [
      {
        path: "partner-applicant/:id",
        element: <EditPartner />,
      },
      {
        path: "partner-applicant/create",
        element: <CreatePartner />,
      },
      {
        path: "partner-applicant/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Գործընկերներ",
    path: "/partner-authorized",
    element: <PartnerAuthorized />,
    icon: "/icons/partners.svg",
    children: [
      {
        path: "partner-authorized/:id",
        element: <EditPartner />,
      },
      {
        path: "partner-authorized/create",
        element: <CreatePartner />,
      },
      {
        path: "partner-authorized/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Ապրանքանիշեր",
    path: "/trademark",
    element: <TradeMark />,
    icon: "/icons/brands.svg",
    children: [
      {
        path: "trademark/:id",
        element: <EditTradeMark />,
      },
      {
        path: "trademark/detail/:id",
        element: <TrademarkDetail />,
      },
      {
        path: "trademark/create",
        element: <CreateTradeMark />,
      },
      {
        path: "trademark/attach-country/:id",
        element: <AttachCountry />,
      },
      {
        path: "trademark/edit-attach-country/:id",
        element: <EditAttachCountry />,
      },
    ],
  },
  {
    name: "Առարկություններ",
    path: "/objections",
    element: <Objections />,
    icon: "/icons/objections.svg",
    children: [
      {
        path: "objections/create",
        element: <CreateObjection />,
      },
      {
        path: "objections/:id",
        element: <EditObjection />,
      },
      {
        path: "objections/detail/:id",
        element: <ObjectionDetail />,
      },
      {
        path: "objections/attach-country/:id",
        element: <AttachCountry />,
      },
      {
        path: "objections/edit-attach-country/:id",
        element: <EditAttachCountry />,
      },
    ],
  },
  {
    name: "Փաստաթղթի տեսակ",
    path: "/doc-type",
    element: <DocType />,
    icon: "/icons/documents.svg",
  },
  {
    name: "Փաստաթղթեր",
    path: "/ledger-docs",
    element: <LedgerDocs />,
    icon: "/icons/documents.svg",
  },
  {
    name: "Գործառնության տեսակ",
    path: "/operation-type",
    element: <OperationType />,
    icon: "/icons/operations.svg",
  },
  {
    name: "Գործառնություններ",
    path: "/operations",
    element: <Operations />,
    icon: "/icons/operations.svg",
  },
  {
    name: "Ապրանքային նշանի օգտագործում ",
    path: "/use-trademark",
    element: <UseTrademark />,
    icon: "/icons/attached.svg",
    children: [
      {
        path: "/use-trademark/create",
        element: <CreateUseTrademark />,
      },
      {
        path: "use-trademark/edit/:id",
        element: <EditUseTrademark />,
      },
    ],
  },
];

export const subRoutes = [
  {
    name: "Անձնական տվյալներ",
    path: "/personal",
    element: <Personal />,
    icon: "/icons/users.svg",
  },

  {
    name: "Այլ տեղեկություններ",
    path: "/info",
    element: <Info />,
    icon: "/icons/map.svg",
  },

  {
    name: "Երկրներ",
    path: "/city",
    element: <City />,
    icon: "/icons/map.svg",
    children: [
      {
        path: "city/:userId",
        element: <EditCity />,
      },
    ],
  },
  {
    name: "Իմ Ընկերությունները",
    path: "/company",
    element: <Company />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "company/:id",
        element: <EditCompany />,
      },
      {
        path: "company/detail/:id",
        element: <DetailCompany />,
      },
      {
        path: "company/create",
        element: <CreateCompany />,
      },
    ],
  },
  {
    name: "Հայտատու անձիք",
    path: "/partner-applicant",
    element: <PartnerApplicant />,
    icon: "/icons/applicants.svg",
    children: [
      {
        path: "partner-applicant/:id",
        element: <EditPartner />,
      },
      {
        path: "partner-applicant/create",
        element: <CreatePartner />,
      },
      {
        path: "partner-applicant/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Գործընկերներ",
    path: "/partner-authorized",
    element: <PartnerAuthorized />,
    icon: "/icons/partners.svg",
    children: [
      {
        path: "partner-authorized/:id",
        element: <EditPartner />,
      },
      {
        path: "partner-authorized/create",
        element: <CreatePartner />,
      },
      {
        path: "partner-authorized/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Ապրանքանիշեր",
    path: "/trademark",
    element: <TradeMark />,
    icon: "/icons/brands.svg",
    children: [
      {
        path: "trademark/:id",
        element: <EditTradeMark />,
      },
      {
        path: "trademark/detail/:id",
        element: <TrademarkDetail />,
      },
      {
        path: "trademark/create",
        element: <CreateTradeMark />,
      },
      {
        path: "trademark/attach-country/:id",
        element: <AttachCountry />,
      },
    ],
  },
  {
    name: "Առարկություններ",
    path: "/objections",
    element: <Objections />,
    icon: "/icons/objections.svg",
    children: [
      {
        path: "objections/create",
        element: <CreateObjection />,
      },
      {
        path: "objections/:id",
        element: <EditObjection />,
      },
      {
        path: "objections/detail/:id",
        element: <ObjectionDetail />,
      },
      {
        path: "objections/attach-country/:id",
        element: <AttachCountry />,
      },
      {
        path: "objections/edit-attach-country/:id",
        element: <EditAttachCountry />,
      },
    ],
  },
  {
    name: "Փաստաթղթի տեսակ",
    path: "/doc-type",
    element: <DocType />,
    icon: "/icons/documents.svg",
  },
  {
    name: "Փաստաթղթեր",
    path: "/ledger-docs",
    element: <LedgerDocs />,
    icon: "/icons/documents.svg",
  },
  {
    name: "Գործառնության տեսակ",
    path: "/operation-type",
    element: <OperationType />,
    icon: "/icons/operations.svg",
  },
  {
    name: "Գործառնություններ",
    path: "/operations",
    element: <Operations />,
    icon: "/icons/operations.svg",
  },
  {
    name: "Ապրանքային նշանի օգտագործում ",
    path: "/use-trademark",
    element: <UseTrademark />,
    icon: "/icons/attached.svg",
    children: [
      {
        path: "/use-trademark/create",
        element: <CreateUseTrademark />,
      },
      {
        path: "use-trademark/edit/:id",
        element: <EditUseTrademark />,
      },
    ],
  },
];

export const userRouters = [
  {
    name: "Անձնական տվյալներ",
    path: "/personal",
    element: <Personal />,
    icon: "/icons/users.svg",
  },
  {
    name: "Այլ տեղեկություններ",
    path: "/info",
    element: <Info />,
    icon: "/icons/map.svg",
  },

  {
    name: "Երկրներ",
    path: "/city",
    element: <City />,
    icon: "/icons/map.svg",
  },
  {
    name: "Իմ Ընկերությունները",
    path: "/company",
    element: <Company />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "company/detail/:id",
        element: <DetailCompany />,
      },
    ],
  },
  {
    name: "Հայտատու անձիք",
    path: "/partner-applicant",
    element: <PartnerApplicant />,
    icon: "/icons/applicants.svg",
    children: [
      {
        path: "partner-applicant/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Գործընկերներ",
    path: "/partner-authorized",
    element: <PartnerAuthorized />,
    icon: "/icons/partners.svg",
    children: [
      {
        path: "partner-authorized/detail/:id",
        element: <PartnerDetail />,
      },
    ],
  },
  {
    name: "Ապրանքանիշեր",
    path: "/trademark",
    element: <TradeMark />,
    icon: "/icons/brands.svg",
    children: [
      {
        path: "trademark/detail/:id",
        element: <TrademarkDetail />,
      },
    ],
  },
  {
    name: "Առարկություններ",
    path: "/objections",
    element: <Objections />,
    icon: "/icons/objections.svg",
    children: [
      {
        path: "objections/detail/:id",
        element: <ObjectionDetail />,
      },
    ],
  },
  {
    name: "Փաստաթղթեր",
    path: "/ledger-docs",
    element: <LedgerDocs />,
    icon: "/icons/documents.svg",
  },
  {
    name: "Գործառնություններ",
    path: "/operations",
    element: <Operations />,
    icon: "/icons/operations.svg",
  },
  {
    name: "Ապրանքային նշանի օգտագործում ",
    path: "/use-trademark",
    element: <UseTrademark />,
    icon: "/icons/attached.svg",
  },
];

export const guestRoutes = [
  {
    name: "Անձնական տվյալներ",
    path: "/personal",
    element: <Personal />,
    icon: "/icons/users.svg",
  },
  {
    name: "Հայտատու անձիք",
    path: "/partner-applicant",
    element: <PartnerApplicant />,
    icon: "/icons/applicants.svg",
  },
  {
    name: "Գործընկերներ",
    path: "/partner-authorized",
    element: <PartnerAuthorized />,
    icon: "/icons/partners.svg",
  },
];

export const notRegisterRoutes = [
  {
    path: "/login",
    name: "Մուտք",
    element: <Login />,
    icon: "/icons/sign-in.svg",
  },
];
