import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import IAMessage from './components/iamessage';
import UserMessage from './components/usermessage';

export default function HomeScreen() {
	const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState("");
	const [data, setData] = useState([]);

	function handleInput() {
		setData((prevList) => [...prevList, inputText] as any as []);
		setInputText("");
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<View style={styles.header}>
				<Image 
					resizeMode='contain' 
					source={require("../assets/icons/logo-alura.png")} 
					style={styles.imageAlura} />

				<Image 
					resizeMode='contain' 
					source={require("../assets/icons/imersao_ia_google_logo.png")} 
					style={styles.imageImersao} />
			</View>

			<FlatList
				keyExtractor={(_, index) => index.toString()}
				style={{ paddingHorizontal: 16, paddingBottom: 100, paddingTop: 16 }}
				data={data}
				renderItem={({ item }) => (
					<View>
						<UserMessage message={item} />
						<IAMessage prompt={item} />
					</View>
				)}
			/>

			<View style={isFocused ? styles.textInputTrue : styles.textInputFalse}>
				<TextInput 
          placeholder="Digite uma pergunta" 
					placeholderTextColor={'#9d9ea0'}
          style={styles.inputText} 
          value={inputText} 
          onChangeText={(text) => setInputText(text)}
					onBlur={() => setIsFocused(false)}
      		onFocus={() => setIsFocused(true)}
					onSubmitEditing={handleInput}/>

				<TouchableOpacity onPress={handleInput} style={styles.button}>
					<Image source={require("../assets/icons/paper-plane.png")} style={styles.imageButton} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
		backgroundColor: '#0B192C'
	},
	header: {
		flexDirection: "row",
		width: '100%',
		justifyContent: 'space-between',
		alignItems: "center",
		marginTop: 8,
		paddingHorizontal: 16,
		minHeight: 50,
		paddingVertical: 4,
		backgroundColor: '#163364'
	},
	imageAlura: {
		width: 100,
		height: 32,
	},
	imageImersao: {
		width: 100,
		height: 48,
	},
	inputText: {
		color: '#F1F2F3',
		width: "100%",
		fontSize: 18,
		paddingHorizontal: 24,
		height: 60,
		borderRadius: 32,
		borderWidth: 0
	},
	textInputTrue: {
		marginHorizontal: 16,
		backgroundColor: '#163364',
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: 32,
		borderWidth: 2,
		borderColor: '#F1F2F3',
		marginTop: 4
	},
	textInputFalse: {
		marginHorizontal: 16,
		backgroundColor: '#163364',
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: 32,
		borderWidth: 2,
		borderColor: 'transparent',
		marginTop: 4
	},
	button: {
		backgroundColor: '#F1F2F3',
		position: 'absolute',
		height: 60,
		width: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageButton: {
		width: 30,
		height: 30,
	},
});
