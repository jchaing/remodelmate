import clsx from 'clsx'
import { FieldHookConfig, useField } from 'formik'
import { DetailedHTMLProps, HTMLProps, TextareaHTMLAttributes } from 'react'

export const GenericFormField = ({
  label,
  ...props
}: HTMLProps<HTMLInputElement> &
  (DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    FieldHookConfig<string>)) => {
  const [field, meta, _helpers] = useField(props.name)

  const hasError = meta.touched && meta.error

  const inputStyles = clsx(
    hasError
      ? 'border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 placeholder-gray-400 focus:ring-slate-900',
    'block w-full px-5 py-3 border focus:outline-none rounded-md shadow-sm',
    'text-base text-gray-900 placeholder-gray-500'
  )

  return (
    <div className="space-y-1">
      {label ? (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}

      <div>
        {props.name === 'message' ? (
          <textarea className={inputStyles} {...field} {...props} />
        ) : (
          <input className={inputStyles} {...field} {...props} />
        )}
      </div>

      <div className=" mt-2 block text-sm text-red-600">
        {hasError ? <p>{meta.error}</p> : null}
      </div>
    </div>
  )
}
