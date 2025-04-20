import { Box, HStack, Image, Text } from "@hope-ui/solid";

const data = {
    name: "Менеджер"
}

export default function Header() {

    return (
        <HStack h={"$12"} w={"$full"} bgColor={"$neutral8"} p={"$4"} borderBottom={"1px solid #E1E1E1"} boxShadow={"md"}>
            <HStack gap={"$2"}>
                <Image h={"$8"} src="https://img.freepik.com/free-icon/user_318-159711.jpg" />
                <Text color={"$blackAlpha10"} fontWeight={"$medium"}>
                    Привет, {data.name}
                </Text>
            </HStack>
        </HStack>
    );    
}