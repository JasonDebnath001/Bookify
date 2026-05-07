"use client";

import * as React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type ControllerRenderProps,
} from "react-hook-form";

export function Form({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={className} {...props} />;
}

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={className} {...props} />;
}

export function FormControl({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={className} {...props} />;
}

export function FormMessage({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={className} {...props} />;
}

interface FormFieldProps<T extends FieldValues, Name extends FieldPath<T>> {
  control: Control<T>;
  name: Name;
  render: (props: { field: ControllerRenderProps<T, Name> }) => React.ReactNode;
}

export function FormField<T extends FieldValues, Name extends FieldPath<T>>({
  control,
  name,
  render,
}: FormFieldProps<T, Name>) {
  return (
    <Controller
      control={control}
      name={name}
      render={(props) => <>{render(props)}</>}
    />
  );
}
