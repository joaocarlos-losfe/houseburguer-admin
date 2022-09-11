const host = "https://hbb-jcsf.herokuapp.com/";

import axios from 'axios';

export const ApiURIs = 
{
    users:
    {
        create: host + "houseburguer/api/user/create",
        get: host + "",
        getAll: host + "houseburguer/api/user/",
        update: host + "houseburguer/api/user/update/",
        delete: host + "houseburguer/api/user/delete/",
        getMetrics: host + "houseburguer/api/user/get-metrics/all",
    },

    menuItems:
    {
        create: host + "houseburguer/api/menu/create/",
        get: "",
        getAll: host + "houseburguer/api/menu/get/",
        update: host + "houseburguer/api/menu/update/",
        delete: host + "houseburguer/api/menu/delete/",
    },

    promotions:
    {
        create: host + "houseburguer/api/promotion/create",
        get: "",
        getAll: host + "houseburguer/api/promotion/get",
        update: host + "houseburguer/api/promotion/update/",
        delete: host + "houseburguer/api/promotion/delete/",
    },

    lottery:
    {
        create: host + "houseburguer/api/lottery/create",
        get: host + "houseburguer/api/lottery/get",
        getLast: host + "houseburguer/api/lottery/get/last",
        update: "",
        delete: "",
        start: host + "houseburguer/api/lottery/start"
    },

    admin:
    {
        login: host + "houseburguer/api/admin/login"
    }

}

export const ApiAccess = axios.create(
{
    baseURL : 'https://hbb-jcsf.herokuapp.com/',
});

