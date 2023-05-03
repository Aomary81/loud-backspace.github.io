module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[	"module-resolver",
				{	
					"root": ["./pages"],
					"alias": {
						"@PageLayouts": "./pages/components/PageLayouts"
					},
					//Paths put into alias must go all of the way to the destination file
					//Experimentation has found that aliases do not work well for destination directories
				}
			],
			'react-native-reanimated/plugin',
			["module:react-native-dotenv", {
				"safe": true
			}]
		],
	};
};
