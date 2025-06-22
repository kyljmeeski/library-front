import {Box, Input} from "@hope-ui/solid";

export default function DateSelector(props) {
    return (
        <Box w="$full">
            <Input
                type="date"
                name={props.name}
                value={props.value()}
                onInput={(e) => props.setValue(e.currentTarget.value)}
                disabled={props.disabled}
                __css={{ width: "100%" }}
            />
        </Box>
    );
}
