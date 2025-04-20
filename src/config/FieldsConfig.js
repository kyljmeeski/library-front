export default function useFieldsConfig(){

    const zeroFields = [ 
        
    ]

    const oneFields = [
        
    ]
    
    const twoFields = [
        {
            number: "245",
            name: "Title Statement",
            removable: true,
            copiable: false,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Title",
                    required: true,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "b",
                    name: "Remainder of title",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
            ]
        }, 
        {
            number: "250",
            name: "Edition Statement",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Edition statement",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "b",
                    name: "Remainder of edition statement",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
            ]
        }, 
        {
            number: "260",
            name: "Publication, Distribution, Etc.",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Place of publication, distribution, etc.",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "b",
                    name: "Name of publication, distribution, etc.",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "c",
                    name: "Date of publication, distribution, etc.",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
            ]
        }, 
        {
            number: "270",
            name: "Address",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Address",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "b",
                    name: "City",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "c",
                    name: "State of province",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "d",
                    name: "Country",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "e",
                    name: "Postal code",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "k",
                    name: "Telephone number",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "n",
                    name: "Electronic mail address",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "r",
                    name: "Hours",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
            ]
        }, 
    ]

    const threeFields = [
        {
            number: "300",
            name: "Physical Description",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Extent",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "b",
                    name: "Other physical details",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "c",
                    name: "Dimensions",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "e",
                    name: "Accompanying material",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "f",
                    name: "Type of unit",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "g",
                    name: "Size of unit",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
            ]
        }, 
        {
            number: "365",
            name: "Trade Price",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "b",
                    name: "Price amount",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "c",
                    name: "Currency code",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "d",
                    name: "Unit of pricing",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
            ]
        }, 
    ]

    const fourFields = [
        {
            number: "490",
            name: "Series Statement",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "3",
                    name: "Materials specified",
                    required: false,
                    editable: false,
                    repeatable: false, 
                }, 
                {
                    number: "a",
                    name: "Series statement",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "v",
                    name: "Volume / sequential designation",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
                {
                    number: "z",
                    name: "International Standard Series Number",
                    required: false,
                    editable: false,
                    repeatable: true, 
                }, 
            ]
        }, 
    ]

    const fiveFields = [
        {
            number: "500",
            name: "General Note",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "General note",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
            ]
        }, 
        {
            number: "520",
            name: "Summary, Etc.",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Summary, etc.",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
            ]
        }, 
        {
            number: "526",
            name: "Study Program Information Note",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Program name",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
                {
                    number: "b",
                    name: "Interest level",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
                {
                    number: "c",
                    name: "Reading level",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
                {
                    number: "d",
                    name: "Title point value",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
            ]
        }, 
        {
            number: "586",
            name: "Awards Notes",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Awards Notes",
                    required: false,
                    editable: false,
                    repeatable: false, 
                    isTextarea: true, 
                }, 
            ]
        }, 
    ]

    const sixFields = [
        {
            number: "600",
            name: "Subject Added Entry-Personal Name",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a",
                    name: "Personal name", 
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                },
                {
                    number: "d",
                    name: "Dates associated with a name", 
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                },
                {
                    number: "t",
                    name: "Title of a work", 
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                },
            ]
        }, 
        {
            number: "610",
            name: "Subject Added Entry-Corporate Name",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a", 
                    name: "Corporate name or jurisdiction name as entry element ",
                    required: false, 
                    editable: true, 
                    repeatable: false, 
                },
                {
                    number: "b", 
                    name: "Subordinate unit",
                    required: false, 
                    editable: false, 
                    repeatable: true, 
                },
                {
                    number: "t", 
                    name: "Title of a work ",
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                },
            ]
        }, 
    ]

    const sevenFields = [
        {
            number: "700",
            name: "Added Entry-Personal Name",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a", 
                    name: " Personal name", 
                    required: false, 
                    editable: true, 
                    repeatable: false, 
                }, 
                {
                    number: "d", 
                    name: "Dates associated with a name", 
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                }, 
                {
                    number: "e", 
                    name: "Relator ter", 
                    required: false, 
                    editable: false, 
                    repeatable: true, 
                }, 
                {
                    number: "q", 
                    name: "Fuller form of name", 
                    required: false, 
                    editable: false, 
                    repeatable: false, 
                }, 
            ]
        }, 
        {
            number: "710",
            name: "Added Entry-Corporate Name",
            removable: true,
            copiable: true,
            hasIndicators: true,
            subfields: [
                {
                    number: "a", 
                    name: "Corporate name or jurisdiction name as entry element (NR)", 
                    required: false, 
                    editable: true, 
                    repeatable: false, 
                }, 
                {
                    number: "b", 
                    name: "Subordinate unit (R)", 
                    required: false, 
                    editable: false, 
                    repeatable: true, 
                }, 
                {
                    number: "e", 
                    name: "Relator term (R)", 
                    required: false, 
                    editable: false, 
                    repeatable: true, 
                }, 
            ]
        }, 
    ]
 
    return {
        zeroFields, 
        oneFields, 
        twoFields, 
        fourFields, 
        fiveFields, 
        threeFields, 
        sixFields, 
        sevenFields, 
    }


}