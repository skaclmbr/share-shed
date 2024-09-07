import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ThingCreateFormInputValues = {
    title?: string;
    content?: string;
    status?: string;
    img_url?: string;
};
export declare type ThingCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    img_url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThingCreateFormOverridesProps = {
    ThingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    img_url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThingCreateFormProps = React.PropsWithChildren<{
    overrides?: ThingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ThingCreateFormInputValues) => ThingCreateFormInputValues;
    onSuccess?: (fields: ThingCreateFormInputValues) => void;
    onError?: (fields: ThingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThingCreateFormInputValues) => ThingCreateFormInputValues;
    onValidate?: ThingCreateFormValidationValues;
} & React.CSSProperties>;
export default function ThingCreateForm(props: ThingCreateFormProps): React.ReactElement;
