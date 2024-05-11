import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function UserMessage(props: { message: string }) {
	return (
		<View style={styles.message}>

			<View style={styles.header}>	
				<Image source={require("../../assets/icons/male-icon.png")} style={styles.icon} />
				<Text style={{ fontWeight: 600, paddingLeft: 8 }}>Usuário</Text>
			</View>

			<Text style={{ fontSize: 16, flex: 1 }}>{props.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	message: {
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
		borderRadius: 14,
	},
});