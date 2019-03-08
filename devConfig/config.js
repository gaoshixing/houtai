let config = {
    port:8080,
    proxyTable:{
        "/spoc-choiceschool":{
            target: 'http://47.93.31.175:8181',
//          target: 'https://portal.ivygate.cn',
            pathRewrite: {
                "^/spoc-choiceschool":"/spoc-choiceschool",
            }
        },
       /*  "/spoc-search": {
            target: 'http://47.93.31.175:8182',
            pathRewrite: {
                "^/spoc-search": "/spoc-search",
            }
        }, */
        "/spoc-contract":{
            target:'http://47.93.31.175:8183',
            pathRewrite: {
                "^/spoc-contract": "/spoc-contract",
            }
        },
       /*  "/spoc-common":{
            target:'http://47.93.31.175:8185',
            pathRewrite: {
                "^/spoc-common": "/spoc-common",
            }
        }, */
        "/spoc-plan":{
            target:'http://47.93.31.175:8186',
            pathRewrite: {
                "^/spoc-plan": "/spoc-plan",
            }
        },
        "/spoc-docu":{
            target:'http://47.93.31.175:8188',
            pathRewrite: {
                "^/spoc-docu": "/spoc-docu",
            }
        },
        "/spoc-crm":{
            target:'http://47.93.31.175:8189',
            pathRewrite: {
                "^/spoc-crm": "/spoc-crm",
            }
        },
        "/spoc-apply":{
            target:'http://47.93.31.175:8190',
            pathRewrite: {
                "^/spoc-apply": "/spoc-apply",
            }
        },
		"/spoc-market":{
            target:'http://47.93.31.175:8192',
            pathRewrite: {
                "^/spoc-market": "/spoc-market",
            }
        },
        "/spoc-salary":{
            target:'http://39.107.224.42:8194',
            //target:'http://172.17.37.127:8194',
            pathRewrite: {
                "^/spoc-salary": "/spoc-salary",
            }
        },
        "/*.php/**":{
            target:'https://portal.ivygate.cn',
            changeOrigin: true,
            headers:{
                cookie:'nc_sameSiteCookielax=true; nc_sameSiteCookiestrict=true; lang=zh; LiveWSMIG96489984=1519715917907568003464; NMIG96489984fistvisitetime=1519715917927; _ga=GA1.2.1555261739.1519715919; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; NMIG96489984IP=%7C61.148.205.198%7C106.38.40.58%7C; nc_username=ivygate; NMIG96489984visitecounts=6; NMIG96489984lastvisitetime=1525228373384; NMIG96489984visitepages=44; oc_sessionPassphrase=pzXjmkTlicHicbMepj1jJTJlhDSPe%2Fq5y4N3qSPZQwoDAXPnyfjSp3lPOVuUlszxJBU7YOG%2B2gkQKMSHND6YAdJ%2BbiATjI0%2FOl0cfzscdD6jAvg8m0yFDBc9Teg%2FMkrO; pageNo=1; pageSize=5; spoc.session.id=64e310c0f720415eaa47f255f32df005; ocxqi14vdtbe=9219d4feee7fbbfa51f58b31f8ddd3bc; nc_token=ZyJZsAq6%2Bd7UfzlxjYFgcQxpWGMFRlq5; nc_session_id=9219d4feee7fbbfa51f58b31f8ddd3bc; CONTAINERID=a08176891426c3786c8c68768d132f24728054f42a9b7a73fbb03a9f51113b01; SERVERID=58206858fc25787ff15a86d2e1008c89|1525346429|1525342182'
            }
        },
        "/chat/":{
            // target:'http://127.0.0.1:2345',
			target:'http://47.93.31.175:2345',
            pathRewrite: {
                "^/chat/": "/",
            }
        }
    }
};
module.exports = config;
