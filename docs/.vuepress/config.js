module.exports = {
    title: 'clxmm',// 设置网站标题
    description: 'clxmm',
    base: '/',// 设置站点根路径
    dest: './clxm',  // 设置输出目录
    head: [],
    plugins: [],
    themeConfig: {
        // 添加导航栏
        nav: [
                { text: '主页', link: '/' },
                { text: '指南', link: '/guide/' },
                { text: 'java相关',
                    items: [
                        { text: 'java日志', link: '/java-about/java-log/01log' },
                        { text: 'java杂七杂八', link: '/java-about/04java-about/01jwt' },
                        { text: 'java', link: '/java-about/03java/01synchronized' },
                        { text: 'shiro', link: '/java-about/06app/01shiro/01' },
                        
                       
                    ]
                },
                { text: 'springCloud相关',
                    items: [
                        { text: 'springCloud相关', link: '/java-about/05spring-cloud/01gateway' },
                    ]
                },
                { text: 'web',
                items: [
                    { text: 'web基础', link: '/web/01web/01web01' },
                    { text: 'js基础', link: '/web/02js/01js' },
                ]
            }

        ],
        sidebar: {
            "/java-about/java-log/":[ 
                {
                    title: 'Java',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/java-log/01log',
                        '/java-about/java-log/02log',
                        '/java-about/02mp/01mp',
                        '/java-about/02mp/02mp',
                    ]
                },  
            ],
      
            "/java-about/05spring-cloud/":[
                {
                    title: 'springCloud',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/05spring-cloud/01gateway',
                        
                    ]
                },
            ],
            "/java-about/03java/":[
                {
                    title: 'Java03',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/03java/01synchronized',
                        '/java-about/03java/02IO',
                        '/java-about/03java/03bio',
                        '/java-about/03java/04nio',
                        '/java-about/03java/05treeMap',
                        '/java-about/03java/06thread',
                    ]
                }, 

            ],
            // shiro
            "/java-about/06app/01shiro/":[
                {
                    title: 'shiro',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/06app/01shiro/01',
                        '/java-about/06app/01shiro/02',
                        '/java-about/06app/01shiro/03',
                        '/java-about/06app/01shiro/04',
                        '/java-about/06app/01shiro/05',
                    ]
                }, 

            ],


            "/java-about/04java-about/":[
                {
                    title: 'java杂七杂八',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/04java-about/01jwt',
                        '/java-about/04java-about/02about',
                        '/java-about/04java-about/03nginx',
                        '/java-about/04java-about/04images',
                        '/java-about/04java-about/05webservice',
                        '/java-about/04java-about/06',
                        '/java-about/04java-about/07gradle',
                    ]
                },
            ],
            "/web/02js/":[
                {
                    title: 'js基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/web/02js/01js',
                        '/web/02js/02js',
                        '/web/02js/03js',
                        '/web/02js/04js',
                        '/web/02js/05js',
                        '/web/02js/06js',
                        '/web/02js/07js',
                        '/web/02js/08webapi',
                        '/web/02js/09webapi',
                        '/web/02js/010webapi',
                        '/web/02js/011webapi',
                        '/web/02js/012webapi',
                        '/web/02js/013jquery',
                        '/web/02js/014jquery',
                    ]
                },
            ],
            "/web/01web/":[
                {
                    title: 'web基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/web/01web/01web01',
                        '/web/01web/02web',
                        '/web/01web/03webcss1',
                        '/web/01web/03webemmet',
                        '/web/01web/04webcss',
                        '/web/01web/05webcss',
                        '/web/01web/06webcss',
                        '/web/01web/07webcss',
                        '/web/01web/08webcss',
                        '/web/01web/09webcss',
                        '/web/01web/010webcss',
                        '/web/01web/011webcss',
                    ]
                },
            ],
        },
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated'
        // sidebar: 'auto'
 
    },
}