import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const ApprovedUsers = React.lazy(() => import('./Demo/Users/ApprovedUsers'));
const UnApprovedUsers = React.lazy(() => import('./Demo/Users/UnApprovedUsers'));
const Videos = React.lazy(() => import('./Demo/Videos/Videos'));
const Listing=React.lazy(() =>import('./Demo/Listing/Listing'))
const PaidListing=React.lazy(() =>import('./Demo/PaidListing/Listing'))
const MainCategory=React.lazy(() =>import('./Demo/Categories/MainCtaegories'))
const Blog=React.lazy(() =>import('./Demo/Blog/Blog'))
const Withdraws = React.lazy(() => import('./Demo/Withdraws/Withdraws'));
const CreateAdmin = React.lazy(() => import('./Demo/Admins/CreateAdmin'));
const Job = React.lazy(() => import('./Demo/CustomMade/Job'));
const Order = React.lazy(() => import('./Demo/CustomMade/Order'));
const JobCategory = React.lazy(() => import('./Demo/CustomMade/JobCategory'));
const Exclusive = React.lazy(() => import('./Demo/Exclusive/Exclusive'));
const ExclusiveCategory = React.lazy(() => import('./Demo/Exclusive/ExclusiveCategory'));
const ExclusiveServices = React.lazy(() => import('./Demo/Exclusive/ExclusiveServices'));
const ViewAdmins = React.lazy(() => import('./Demo/Admins/ViewAdmins'));
const Setting = React.lazy(() => import('./Demo/Profile/Setting'));
const Packages = React.lazy(() => import('./Demo/Packages/Packages'));



const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardDefault },
    { path: '/users/approved-users', exact: true, name: 'Approved-Users', component: ApprovedUsers },
    { path: '/users/unapproved-users', exact: true, name: 'UnApproved-Users', component: UnApprovedUsers },
    { path: '/videos', exact: true, name: 'Videos', component: Videos },
    { path: '/Listing', exact: true, name: 'Listing', component:Listing },
    { path: '/PaidListing', exact: true, name: 'PaidListing', component:PaidListing },
    { path: '/MainCategory', exact: true, name: 'MainCategory', component:MainCategory },
    { path: '/Job', exact: true, name: 'Job', component:Job },
    { path: '/JobCategory', exact: true, name: 'JobCategory', component:JobCategory },
    { path: '/Order', exact: true, name: 'Order', component:Order },
    { path: '/Exclusive', exact: true, name: 'Exclusive', component:Exclusive },
    { path: '/ExclusiveServices', exact: true, name: 'ExclusiveServices', component:ExclusiveServices },
    { path: '/ExclusiveCategory', exact: true, name: 'ExclusiveCategory', component:ExclusiveCategory },
    { path: '/Blog', exact: true, name: 'Blog', component:Blog },
    { path: '/withdraws', exact: true, name: 'Withdraws', component: Withdraws },
    { path: '/admin/create-admin', exact: true, name: 'Create-Admin', component: CreateAdmin },
    { path: '/admin/view-admins', exact: true, name: 'View-Admins', component: ViewAdmins },
    { path: '/profile-setting', exact: true, name: 'Profile-Setting', component: Setting },
    { path: '/packages', exact: true, name: 'Packages', component: Packages },
];

export default routes;