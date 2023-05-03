import { StyleSheet, Dimensions } from 'react-native';
//Menu bar content space
const topBarHeight = 50;
const contentSpaceHeight = (Dimensions.get('window').height - topBarHeight);

const colorPrimary = '#ffffff';
const colorSecondary = '#ffffff';
const colorTertiary = '#000000';

const PageLayouts = StyleSheet.create({
	
	baseview: {
		flex: 1,
		flexDirection: 'column',
		//content alignment
		alignItems: 'center',
	},
	
	topBar: {
		flexDirection: 'row',
		width: '100%',
		height: topBarHeight,
		backgroundColor: colorSecondary,
	},
	
	contentSpace: {
		flexDirection: 'row',
		width: '100%',
		height: contentSpaceHeight,
		
		//content alignment
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colorPrimary,
	},
	
	contentColumn: {
		
		flexDirection: 'column',
		height: '100%',
		width: '90%',
		
		//content alignment
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		backgroundColor: colorPrimary,
		
	},
	
	menuBar: {
		flexDirection: 'column',
		//width: landscapeMenuBar,
		height: '100%',
		backgroundColor: colorSecondary,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	
	//main content items go in content column as content page/tab
	mainContentSpace: {
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		backgroundColor: colorPrimary,
	},
	
	mainContentItem: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		backgroundColor: colorPrimary
	},
	
	userIconTitle: {
		flexDirection: 'row',
		width: '98%',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	
	userIconTitleTextStack: {
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	
	userIconSmall: {
		width: 50,
		height: 50,
		borderRadius: '50%'
	},

	container: {
		display: 'flex',
		marginLeft: 15,
		marginRight: 15,
		padding: 25
	},

	pageTitle: {
		fontSize: 25,
		fontWeight: 'bold'
	},

	pageDescription: {
		fontSize: 18,
		fontweight: '450',
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 5
	},

	pageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},

	descriptionContainer: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 10
	}

});

export default PageLayouts;
