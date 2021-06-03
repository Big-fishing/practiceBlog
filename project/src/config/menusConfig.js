const menusConfig = [
    {
        title: '首页', // 菜单标题名称
        key: '/admin/home', // 对应的path
        icon: 'icon-home', // 图标名称
        public:true,//该权限开放给所有用户
    },
    {
        title: '笔记',
        key: '/admin/study',
        icon: 'icon-xuexi',
        children: [ // 子菜单列表
            {
                title: 'HTML/CSS',
                key: '/admin/study/hmtl_css',
                icon: 'icon-HTML-fill'
            },
            {
                title: 'javascript',
                key: '/admin/study/javascript',
                icon: 'icon-js'
            },
            {
                title: 'nodeJs',
                key: '/admin/study/nodeJs',
                icon: 'icon-node'
            },
            {
                title: 'react',
                key: '/admin/study/react',
                icon: 'icon-react'
            }
        ]
    },
    {
        title: '动态',
        key: '/admin/dynamic',
        icon: 'icon-biaoqiankuozhan_dongtai-259'
    },
    {
        title: '随写',
        key: '/admin/life',
        icon: 'icon-shenghuo',
    },
    {
        title: '友链',
        key: '/admin/links',
        icon: 'icon-lianjie',
    },
    {
        title: '关于',
        key: '/admin/about',
        icon: 'icon-tubiao04',
    },
    {
        title: '修改密码',
        key: '/admin/password',
        icon: 'icon-mima',
    }
]

export default menusConfig
