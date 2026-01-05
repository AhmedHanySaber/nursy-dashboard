import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { BaseFieldProps } from "@/types/default"
import { FieldValues } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { LucideIcon } from "lucide-react"
import clsx from "clsx"

type WithClassName = { className?: string }
type WithIcon = { icon?: LucideIcon }

// ---------------------- PASSWORD ----------------------
export function PasswordField<T extends FieldValues>({ control, name, label, className, icon: Icon }: BaseFieldProps<T> & WithClassName & WithIcon) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              {Icon && <Icon className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />}
              <Input type='password' placeholder='••••••' {...field} className={clsx(Icon && "pl-8")} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ---------------------- TEXT ----------------------
export function TextField<T extends FieldValues>({ control, name, label, type = "text", placeholder, className, icon: Icon }: BaseFieldProps<T> & { type?: string; placeholder?: string } & WithClassName & WithIcon) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              {Icon && <Icon className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />}
              <Input type={type} placeholder={placeholder} {...field} value={field.value ?? ""} onChange={(e) => field.onChange(type === "number" ? (e.target.value === "" ? undefined : +e.target.value) : e.target.value)} className={clsx(Icon && "pl-8")} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ---------------------- SELECT ----------------------
export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  className
}: BaseFieldProps<T> & {
  options: { label: string; value: string }[]
  placeholder?: string
} & WithClassName) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Select…"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ---------------------- TEXTAREA ----------------------
export function TextareaField<T extends FieldValues>({ control, name, label, placeholder, className }: BaseFieldProps<T> & { placeholder?: string } & WithClassName) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ---------------------- CHECKBOX ----------------------
export function CheckboxField<T extends FieldValues>({ control, name, label, className }: BaseFieldProps<T> & WithClassName) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={clsx("flex flex-row items-start space-x-3 space-y-0", className)}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
