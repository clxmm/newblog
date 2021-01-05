module.exports = {
    title: 'clxmm',// 设置网站标题
    description: 'clxmm',
    base: '/',// 设置站点根路径
    dest: './clxmm.github.io',  // 设置输出目录
    head: [],
    plugins: [],
    themeConfig: {
        // 添加导航栏
        nav: [
                { text: '主页', link: '/' },
                { text: '指南', link: '/guide/' },
                { text: 'java相关',
                    items: [
                        { text: 'java基础', link: '/java/java-base/' },
                        { text: 'java与opc通信', link: '/java/java-opc/' }
                    ]
                }
            ],
        sidebar: [],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    },
}