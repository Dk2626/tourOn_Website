export const setAdminRoute = (pathname) => {
  let adminRoutes = [
    "/admindashboard",
    "/adminpage",
    "/profile",
    "/profile/user-details",
    "/profile/my-requests",
    "/profile/saved-tours",
    "/profile/my-plans",
    "/profile/myvisa-requests",
    "/profile/faq",
    "/profile/support",
    "/profile/selfplan",
    "/admin",
    "/admin/requests",
    "/admin/customers",
    "/admin/city",
    "/admin/countries",
    "/admin/tours",
    "/admin/testimonials",
    "/admin/blogpage",
    "/admin/adminusers",
    "/admin/promotion",
  ];

  let isAdminRoute = adminRoutes.includes(pathname);
  return isAdminRoute;
};
