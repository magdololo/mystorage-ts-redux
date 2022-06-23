import { StylesConfig } from "react-select";

export type Variants = "primary" | "secondary";

export type VariantStyle = {
    control: {
        backgroundColor: string;
        boxShadow: string;
        width: string;
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
};

const VARIANTS: { [key in Variants]: VariantStyle } = {
    // Dark-theme style
    primary: {
        control: {
            backgroundColor: "#6366F1",
            boxShadow: "#6366F1",
            width: "300px"
        },

        placeholder: {
            color: "#52525B"

        },

        input: {
            color: "#E5E7EB"
        },

        singleValue: {
            color: "#E5E7EB"
        },

        option: {
            backgroundColor: "transparent",
            backgroundColorFocused: "#4B5563",
            color: "#E5E7EB"
        },

        menu: {
            backgroundColor: "#374151"
        }
    },

    // Light-theme style
    secondary: {
        control: {
            backgroundColor: "#ffffff",
            boxShadow: "#6366F1",
            width: "300px"
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
        }
    }
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={true} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
export const singleSelectStyle = (
    variant: Variants = "primary"
): StylesConfig<unknown, false> => {
    const style = VARIANTS[variant];

    return {
        control: (provided, state) => ({
            ...provided,
            border: "1px solid gray",
            borderRadius: "0.225rem",
            backgroundColor: style.control.backgroundColor,
            boxShadow: state.isFocused
                ? `0 0 0 3px ${style.control.boxShadow}, 0 0 #0000`
                : "",
            transition: "box-shadow 0.1s ease-in-out",
            padding: "4px 2px"
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

        indicatorSeparator: (provided) => ({
            ...provided,
            display: "none"
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
            color: style.singleValue.color
        }),

        option: (provided, state) => ({
            ...provided,
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.25rem",
            backgroundColor: state.isFocused
                ? style.option.backgroundColorFocused
                : style.option.backgroundColor,
            color: style.option.color
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: style.menu.backgroundColor
        })
    };
};
