import { AddSvg, DeleteSvg, TickSvg } from '@/assets'
import { FormikValues } from 'formik'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileInputProps {
  id: string
  label: string
  formik: FormikValues
}

const FileInput: React.FC<FileInputProps> = props => {
  let color = '#021526'

  // ERROR (RED)
  if (props.formik.touched[props.id] && props.formik.errors[props.id]) {
    color = '#F93B1D'
  }

  // SUCCESS (GREEN)
  if (props.formik.touched[props.id] && !props.formik.errors[props.id]) {
    color = '#45A849'
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      props.formik.setFieldTouched(props.id, true)

      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = () => {
          const base64File = reader.result

          props.formik.setFieldValue(props.id, base64File as string)
        }

        // Read the file as Base64
        reader.readAsDataURL(file)
      }
    },
    [props.formik, props.id],
  )

  const handleRemoveFile = () => props.formik.setFieldValue(props.id, '')

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
    maxSize: 1048576, // 1 MB in bytes
    maxFiles: 1,
    disabled: !!props.formik.values[props.id],
  })

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium leading-4 text-[#021526]"
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div
        className={`flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-[#2D3648] ${props.formik.errors[props.id] && props.formik.touched[props.id] && 'border-[#F93B1D]'}`}
      >
        {!props.formik.values[props.id] ? (
          <div
            {...getRootProps({
              className: `${isDragActive ? 'bg-[#e7e7e7]' : ''} cursor-pointer flex-col h-full w-full flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-[#eeeeee]`,
            })}
          >
            <input {...getInputProps()} id={props.id} />
            <AddSvg />
          </div>
        ) : (
          <div className="relative">
            {/* Preview image */}
            {props.formik.values[props.id] && (
              <img
                src={props.formik.values[props.id]}
                alt="preview of your uploaded image"
                className="aspect-square h-20 rounded-md object-cover"
              />
            )}
            {/* Remove button */}
            <div
              className="absolute -bottom-1.5 -right-1.5 cursor-pointer"
              onClick={handleRemoveFile}
            >
              <DeleteSvg />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <TickSvg color={color} />
        <p style={{ color: color }} className={`text-sm leading-4`}>
          სურათი და არ უნდა აღემატებოდეს 1mb-ის ზომაში
        </p>
      </div>
    </div>
  )
}

export default FileInput
