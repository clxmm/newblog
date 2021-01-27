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
                        { text: 'java与opc通信', link: '/java/java-opc/01lgo' }
                    ]
                }
        ],
        sidebar: [ 
            {
                title: 'Java',
                path: '/java-about/',
                collapsable: true,
                sidebarDepth: 2,
                displayAllHeaders: true,
                children: [
                    '/java-about/java-log/01log',
                    '/java-about/java-log/02log',
                    '/java-about/02mp/01mp',
                    '/java-about/02mp/02mp',
                ]
            },
            {
                '/java-about/java-log/': [
                    {
                        title: '生活测试',
                        collapsable: true,
                        children: [
                            { title: '生活测试01', path: '/java-about/java-log/01log' },
                        ]
                    }
                ],
            }
            
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    },
}