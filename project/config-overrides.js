const { override, fixBabelImports, addLessLoader} = require('customize-cra');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
 

const addPlugins = ()=> (config)=>{
	config.plugins.push(new MonacoWebpackPlugin({
	  languages: ['json','javascript','html','css','less','typescript']
	}));
	return config;
}


module.exports = override(
	addPlugins(),
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { '@primary-color': '#084ea2' },
	})
  );
