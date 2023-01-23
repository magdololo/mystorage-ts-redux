import {StylesConfig} from "react-select";

export type Variants = "primary" | "secondary";

export type VariantStyle = {
    control: {
        backgroundColor: string;
        boxShadow: string;
        width: string;
        border: string;
    };

    placeholder: {
        color: string;
    };

    input: {
        color: string;
    };

    singleValue: {
        color: string;
    };

    option: {
        backgroundColor: string;
        backgroundColorFocused: string;
        color: string;
    };

    menu: {
        backgroundColor: string;
    };

    indicatorContainer: {
        color: string;
    };

    indicatorSeparator: {
        color: string;
    };
};

const VARIANTS: { [key in Variants]: VariantStyle } = {
    // Dark-theme style
    primary: {
        control: {
            backgroundColor: "white",
            boxShadow: "#6b21a8",
            width: "",
            border: "#6b21a8"
        },

        placeholder: {
            color: "#6b21a8"

        },

        input: {
            color: "yellow"
        },

        singleValue: {
            color: "pink"
        },

        option: {
            backgroundColor: "transparent",
            backgroundColorFocused: "#591c87", //"#4B5563",
            color: "#E5E7EB"
        },

        menu: {
            backgroundColor: "#6b21a8"//"#374151"
        },

        indicatorContainer: {
            color: "purple",
        },

        indicatorSeparator: {
            color: "#6b21a8",
        },
    },

    // Light-theme style
    secondary: {
        control: {
            backgroundColor: "#ffffff",
            boxShadow: "#6366F1",
            width: "300px",
            border: "#6366F1"
        },

        placeholder: {
            color: "#9CA3AF"
        },

        input: {
            color: "#111827"
        },

        singleValue: {
            color: "#111827"
        },

        option: {
            backgroundColor: "transparent",
            backgroundColorFocused: "#E5E7EB",
            color: "#111827"

        },

        menu: {
            backgroundColor: "#F3F4F6"
        },

        indicatorContainer: {
            color: "purple"
        },

        indicatorSeparator: {
            color: "#111827"
        }
    }
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={true} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
type Option = {
    value: string
    label: string
    padding: string
    class: string
}

type IsMulti = false;
export const singleSelectStyle = (
    variant: Variants = "primary"
): StylesConfig<Option, IsMulti> => {
    const style = VARIANTS[variant];

    return {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused
                ? `1px solid ${style.control.border}`
                : "1px solid #6b21a8",
            "&:hover": {
                border: `1px solid ${style.control.border}`,
                boxShadow: "none"
            },
            "&:active": {
                backgroundColor: "yellow"
            },
            borderRadius: "0.225rem",
            backgroundColor: style.control.backgroundColor,
            boxShadow: state.isFocused
                ? `0 0 0 1.5px ${style.control.boxShadow},0 0 #0000`
                : "",
            // transition: "box-shadow 0.1s ease-in-out",
            // padding: "4px 2px"
        }),

        placeholder: (provided) => ({
            ...provided,
            fontSize: "1.125rem",
            fontFamily: "Inter",
            fontWeight: 500,
            lineHeight: "1.75rem",
            color: style.placeholder.color
        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: "0.25rem 1rem"
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            color: style.indicatorContainer.color
        }),

        indicatorSeparator: (provided) => ({
            ...provided,
            display: "inline",
            color: style.indicatorSeparator.color,
        }),

        input: (provided) => ({
            ...provided,
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: style.input.color
        }),

        singleValue: (provided) => ({
            ...provided,
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: "#111827"


        }),

        option: (provided, state) => ({
            ...provided,
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: state.data.class === "optionBase" ? "1.2rem" : "1rem",
            lineHeight: "1.25rem",
            backgroundColor: state.isFocused
                ? style.option.backgroundColorFocused
                : style.option.backgroundColor,
            color: style.option.color,
            paddingLeft: state.data.class === "optionBase" ? "20px" : "40px",
            "&:hover": {
                border: `1px solid red`,
                boxShadow: "none"
            },
            "&:active": {
                backgroundColor: "yellow"
            },
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: style.menu.backgroundColor
        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#6b21a8"
        })
    };
};
