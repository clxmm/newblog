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
                        { text: 'security', link: '/java-about/06app/02security/01' },
                        { text: 'javaee', link: '/java-about/06app/03javaee/01' },
                        { text: 'springboot', link: '/java-about/06app/04springboot/01' },
                        
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
                        { text: 'vue基础', link: '/web/03vue/01vue' },
                        { text: 'vlog', link: '/web/04vlog/01' },
                    ]
                },
                { text: 'java 基础',
                    items: [
                        { text: 'java 基础', link: '/java-about/07javabase/01flux/01flux' },
                        { text: 'java 基础1', link: '/java-about/07javabase/02base/01' },
                        { text: '03java 基础nio', link: '/java-about/07javabase/03nio/01' },
                        { text: '04cloud', link: '/java-about/07javabase/04cloud2021/01' },

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
                        '/java-about/06app/01shiro/06',
                        '/java-about/06app/01shiro/07',
                    ]
                }, 

            ],

            // security
            "/java-about/06app/02security/":[
                {
                    title: 'security',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/06app/02security/01',
                        '/java-about/06app/02security/02',
                        '/java-about/06app/02security/03',
                        '/java-about/06app/02security/04',
                        '/java-about/06app/02security/05',
                    ]
                }, 

            ],

            // 03 Java ee
            "/java-about/06app/03javaee/":[
                {
                    title: 'security',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/06app/03javaee/01',
                    ]
                }, 

            ],

            // 04 springboot
            "/java-about/06app/04springboot/":[
                {
                    title: 'security',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/06app/04springboot/01',
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
                        '/java-about/04java-about/08',
                        '/java-about/04java-about/09设计原则',
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
            "/web/03vue/":[
                {
                    title: 'vue基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/web/03vue/01vue',
                        '/web/03vue/02vue',
                        '/web/03vue/03vue',
                        '/web/03vue/04vue',
                        '/web/03vue/05vue',
                        '/web/03vue/06vue',
                        '/web/03vue/07vue',
                        '/web/03vue/08vue',
                        '/web/03vue/09vue',
                        '/web/03vue/010vue',
                        '/web/03vue/011day02',
                        '/web/03vue/12day04',
                        '/web/03vue/13day05vue',
                        '/web/03vue/14vue',


                    ]
                },
            ],
            // vlog
            "/web/04vlog/":[
                {
                    title: 'vlog',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/web/04vlog/01',
                    ]
                },
            ],


            "/java-about/07javabase/01flux/":[
                {
                    title: 'java 基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/07javabase/01flux/01flux',
                        
                    ]
                },
            ],

            "/java-about/07javabase/02base/":[
                {
                    title: 'java 基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/07javabase/02base/01',
                        '/java-about/07javabase/02base/02thread',
                        '/java-about/07javabase/02base/03thread',
                        '/java-about/07javabase/02base/04mybatis',
                        '/java-about/07javabase/02base/05mybatis',
                        '/java-about/07javabase/02base/06spring',
                        '/java-about/07javabase/02base/07spring',
                        '/java-about/07javabase/02base/08springmvc',
                        '/java-about/07javabase/02base/09springmvc',
                        '/java-about/07javabase/02base/010单一职责.md',
                        '/java-about/07javabase/02base/011开闭原则.md',
                        '/java-about/07javabase/02base/012uml.md',
                        '/java-about/07javabase/02base/013设计模式1',
                        '/java-about/07javabase/02base/014工厂模式',
                        '/java-about/07javabase/02base/015原型模式',
                        '/java-about/07javabase/02base/016适配器模式',
                        '/java-about/07javabase/02base/017桥接模式',
                        '/java-about/07javabase/02base/018组合模式',
                        '/java-about/07javabase/02base/019享元模式',
                        '/java-about/07javabase/02base/020代理模式',
                        '/java-about/07javabase/02base/021命令模式',
                        '/java-about/07javabase/02base/022观察者模式',
                        '/java-about/07javabase/02base/023备忘录模式',
                        
                    ]
                },
            ],
            // nio
            "/java-about/07javabase/03nio/":[
                {
                    title: 'java 基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/07javabase/03nio/01',
                        '/java-about/07javabase/03nio/02', 
                        '/java-about/07javabase/03nio/03', 
                        '/java-about/07javabase/03nio/04', 
                    ]
                },
            ],
            // cloud
            "/java-about/07javabase/04cloud2021/":[
                {
                    title: 'java 基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java-about/07javabase/04cloud2021/01',
                        '/java-about/07javabase/04cloud2021/02',
                        
                    ]
                },
            ],


        },
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated',
        // sidebar: 'auto'
 
    },
}