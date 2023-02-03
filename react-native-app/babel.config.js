module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'./node_modules/react-native-reanimated/plugin',
			[
				"module-resolver",
				{
					"root": ["./pages"],
					"alias": {
						"@PageLayouts": "./pages/components/PageLayouts"
					},
					//Paths put into alias must go all of the way to the destination file
					//Experimentation has found that aliases do not work well for destination directories
				}
			]
		]
	};
};
