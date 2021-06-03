
const NavigationConfig = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'icon-home', // 图标名称
        public:true,//该权限开放给所有用户
    },
    {
        title: '笔记',
        key: '/study',
        icon: 'icon-xuexi',
        children: [ // 子菜单列表
            {
                title: 'HTML/CSS',
                key: '/study/hmtl_css',
                icon: 'icon-HTML-fill'
            },
            {
                title: 'javascript',
                key: '/study/javascript',
                icon: 'icon-js'
            },
            {
                title: 'nodeJs',
                key: '/study/nodeJs',
                icon: 'icon-node'
            },
            {
                title: 'react',
                key: '/study/react',
                icon: 'icon-react'
            }
        ]
    },
    {
        title: '随写',
        key: '/life',
        icon: 'icon-shenghuo',
    },
    {
        title: '友链',
        key: '/links',
        icon: 'icon-lianjie',
    },
    {
        title: '关于',
        key: '/about',
        icon: 'icon-tubiao04',
    }
]
export default NavigationConfig