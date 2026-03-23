import { Pressable, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function NextButton({ onPress, className, ...props }) {
    return (
        <Pressable
            onPress={onPress}
            className={`${className} items-center justify-center`}
            {...props}
        >
            <View className="h-[64px] w-[64px]">
                <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
                    <Path d="M4 32C4 37.5379 5.64217 42.9514 8.71885 47.556C11.7955 52.1605 16.1685 55.7494 21.2849 57.8686C26.4012 59.9879 32.0311 60.5424 37.4625 59.462C42.894 58.3816 47.8831 55.7149 51.799 51.799C55.7149 47.8831 58.3816 42.894 59.462 37.4625C60.5424 32.0311 59.9879 26.4012 57.8686 21.2849C55.7494 16.1685 52.1605 11.7955 47.556 8.71885C42.9514 5.64217 37.5379 4 32 4C24.5739 4 17.452 6.94999 12.201 12.201C6.94999 17.452 4 24.5739 4 32ZM16 30H40.3L29.14 18.786L32 16L48 32L32 48L29.14 45.146L40.3 34H16V30Z" fill="#B1FC30" />
                </Svg>
            </View>
        </Pressable>
    )
}