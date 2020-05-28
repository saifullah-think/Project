export default {
    items: [
        {
            id: 'navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'Users',
                    title: 'Users',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    children: [
                        {
                            id: 'user-1',
                            title: 'Approved Users',
                            type: 'item',
                            url: '/users/approved-users',
                        },
                        {
                            id: 'user-2',
                            title: 'Un-Approved Users',
                            type: 'item',
                            url: '/users/unapproved-users',
                        },
                    ]
                },
                {
                    id: 'Videos',
                    title: 'Videos',
                    type: 'item',
                    url: '/videos',
                    icon: 'feather icon-video',
                },
                {
                    id: 'Withdraw',
                    title: 'Withdraws',
                    type: 'item',
                    url: '/withdraws',
                    icon: 'feather icon-credit-card',
                },
                {
                    id: 'Categories',
                    title: 'Categories',
                    type: 'item',
                    url: '/MainCategory',
                    icon: 'feather icon-grid',
                },

                {
                    id: 'Listing',
                    title: 'Listing',
                    type: 'item',
                    url: '/Listing',
                    icon: 'feather icon-list',
                },

                {
                    id: 'PaidListing',
                    title: 'PaidListing',
                    type: 'item',
                    url: '/PaidListing',
                    icon: 'feather icon-list',
                },
                {
                    id: 'Packages',
                    title: 'Packages',
                    type: 'item',
                    url: '/packages',
                    icon: 'feather icon-package',
                },
                {
                    id: 'Blogs',
                    title: 'Blogs',
                    type: 'item',
                    url: '/Blog',
                    icon: 'feather icon-edit-2',
                },

                {
                    id: 'Exclusive',
                    title: 'Exclusive',
                    type: 'collapse',
                    icon: 'feather icon-settings',
                    children: [
                        {
                            id: 'Ex-1',
                            title: 'Exclusive',
                            type: 'item',
                            url: '/Exclusive',
                        },
                        {
                            id: 'Ex-2',
                            title: 'Exclusive Category',
                            type: 'item',
                            url: '/ExclusiveCategory',
                        },
                        {
                            id: 'Ex-3',
                            title: 'Exclusive Services',
                            type: 'item',
                            url: '/ExclusiveServices',
                        },
                    ]
                },


                {
                    id: 'Custom Made',
                    title: 'Custom Made',
                    type: 'collapse',
                    icon: 'feather icon-settings',
                    children: [
                        {
                            id: 'CM-1',
                            title: 'Job',
                            type: 'item',
                            icon:'feather icon-search',
                            url: '/Job',
                        },
                        {
                            id: 'CM-2',
                            title: 'Job Category',
                            type: 'item',
                            url: '/JobCategory',
                        },
                        {
                            id: 'CM-3',
                            title: 'Order',
                            type: 'item',
                            url: '/Order',
                        },
                    ]
                },



                {
                    id: 'Admins',
                    title: 'Admins',
                    type: 'collapse',
                    icon: 'feather icon-user',
                    children: [
                        {
                            id: 'admin-1',
                            title: 'Create Admin',
                            type: 'item',
                            url: '/admin/create-admin',
                        },
                        {
                            id: 'admin-2',
                            title: 'View Admins',
                            type: 'item',
                            url: '/admin/view-admins',
                        },
                        
                    ]
                },
            ]
        },



        // {
        //     id: 'pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         }




                
                /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
            //]
       // }
    ]
}