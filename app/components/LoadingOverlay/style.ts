import {StyleSheet} from "react-native"


const style = StyleSheet.create({
    main: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: "black",
        zIndex: 3, // works on ios
        elevation: 3, // works on android
        justifyContent: "center",
        alignItems: "center",
    }
})

export default style