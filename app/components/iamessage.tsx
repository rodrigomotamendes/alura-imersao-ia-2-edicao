import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Alert, ActivityIndicator } from "react-native";

import { GoogleGenerativeAI } from "@google/generative-ai";

import Markdown from "react-native-markdown-display";

export default function IAMessage(props: { prompt: string }) {
	const [iaText, setIaText] = useState("");
	const [isLoadingMessage, setIsLoadingMessage] = useState(true)

	const genai = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY as string);

	async function dataGenAI() {
		try {
			setIsLoadingMessage(true);

			const model = genai.getGenerativeModel({ model: "gemini-pro" });
			const prompt = props.prompt;
			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();
			setIaText(text);
		} catch(error) {
			Alert.alert('Erro', 'Por favor verifique sua conexão e tente novamente')
		} finally {
			setIsLoadingMessage(false);
		}
	}

	useEffect(() => {
		dataGenAI()
	}, []);

	return (
		<View style={styles.response}>

			<View style={styles.header}>				
				<Image source={require("../../assets/icons/google-gemini-icon.png")} style={styles.icon} />
				<Text style={{ fontWeight: 600, paddingLeft: 8 }}>Gemini</Text>				
			</View>

			{isLoadingMessage ? 
				<View style={{width: 120}}>
					<ActivityIndicator size={24} color={'#7D81D7'}/>
				</View>	: <Markdown>{iaText}</Markdown>}
		</View>
	);
}

const styles = StyleSheet.create({
	response: {
		flexDirection: "column",
		gap: 8,
		backgroundColor: "#F1F2F3",
		marginBottom: 8,
		padding: 16,
		borderRadius: 16,
	},
	header : { 
		flexDirection: "row", 
		alignItems: "center", 
		justifyContent: "flex-start"
	},
	icon: {
		width: 28,
		height: 28,
	},
});