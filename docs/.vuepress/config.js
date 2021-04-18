module.exports = {
    title: 'clxmm',// 设置网站标题
    description: 'clxmm',
    base: '/',// 设置站点根路径
    dest: './clxmm',  // 设置输出目录
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
                        
                       
                    ]
                },
            ],
        },
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated'
        // sidebar: 'auto'
 
    },
}