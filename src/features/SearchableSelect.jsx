import { Box, Input, List, ListItem } from "@hope-ui/solid";
import { createSignal, createMemo, onMount, onCleanup } from "solid-js";

export function SearchableSelect(props) {
    const [filter, setFilter] = createSignal("");
    const [isOpen, setIsOpen] = createSignal(false);
    const [internalValue, setInternalValue] = createSignal(null);
    const [highlightedIndex, setHighlightedIndex] = createSignal(0);

    let containerRef;
    let inputRef;

    const selected = () => props.value ?? internalValue();

    const filteredOptions = createMemo(() =>
        props.options.filter((opt) =>
            opt.label.toLowerCase().includes(filter().toLowerCase())
        )
    );

    const selectOption = (opt) => {
        props.onChange?.(opt);
        setInternalValue(opt);
        setFilter(opt.label);
        setIsOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (!containerRef.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!isOpen()) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = (highlightedIndex() + 1) % filteredOptions().length;
            setHighlightedIndex(next);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev =
                (highlightedIndex() - 1 + filteredOptions().length) %
                filteredOptions().length;
            setHighlightedIndex(prev);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const option = filteredOptions()[highlightedIndex()];
            if (option) selectOption(option);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        onCleanup(() => {
            document.removeEventListener("mousedown", handleOutsideClick);
        });
    });

    return (
        <Box ref={(el) => (containerRef = el)} position="relative" w="$full">
            <Input
                ref={(el) => (inputRef = el)}
                placeholder={props.placeholder ?? "Select..."}
                value={selected()?.label ?? filter()}
                onInput={(e) => {
                    setFilter(e.currentTarget.value);
                    setIsOpen(true);
                    setHighlightedIndex(0);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                readOnly={false}
            />

            {isOpen() && (
                <Box
                    position="absolute"
                    mt="$1"
                    w="$full"
                    bg="$background"
                    border="1px solid var(--hope-colors-neutral6)"
                    borderRadius="$md"
                    shadow="$md"
                    zIndex="10"
                    maxH="$60"
                    overflowY="auto"
                >
                    <List spacing="$1" p="$2">
                        {filteredOptions().map((opt, index) => (
                            <ListItem
                                cursor="pointer"
                                bg={index === highlightedIndex() ? "$neutral4" : "transparent"}
                                _hover={{ bg: "$neutral3" }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => selectOption(opt)}
                            >
                                {opt.label}
                            </ListItem>
                        ))}
                        {filteredOptions().length === 0 && (
                            <ListItem color="$neutral10">No results</ListItem>
                        )}
                    </List>
                </Box>
            )}
        </Box>
    );
}
