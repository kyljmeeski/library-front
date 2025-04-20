import { Image, Text, VStack } from "@hope-ui/solid";

export default function ActionCard(props) {

    return (
        <VStack 
            onClick={props.disabled ? () => {} : () => props.onClick()} 
            shadow={"$md"} 
            borderWidth={"1px"} 
            borderColor={"$blackAlpha3"} 
            h={"$56"} w={"$44"} 
            cursor={props.disabled ? "not-allowed" : "pointer"} 
            p={"$3"} 
            gap={"$3"}
            opacity={props.disabled ? "0.5" : "1"}
        >
            <Image />
            <Text textAlign={"center"} fontWeight={"$semibold"}>
                {props.title}
            </Text>
        </VStack>
    )
}