import { AddSvg, DeleteSvg } from '@/assets'
import { FormikValues } from 'formik'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileInputProps {
  id: string
  label: string
  formik: FormikValues
}

const FileInput: React.FC<FileInputProps> = props => {
  const [selectedFile, setSelectedFile] = useState<File | ''>('')
  const [preview, setPreview] = useState<string | null>(null) // State for image preview

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file)) // Create a preview URL
        props.formik.setFieldValue(props.id, file)
      }
    },
    [props.formik, props.id],
  )

  const handleRemoveFile = () => {
    setSelectedFile('')
    setPreview(null) // Clear the preview
    props.formik.setFieldValue(props.id, '')
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxSize: 1048576, // 1 MB in bytes
    maxFiles: 1,
    disabled: !!selectedFile,
  })

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium leading-4 text-[#021526]"
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-[#2D3648]">
        {!selectedFile ? (
          <div
            {...getRootProps({
              className: `${isDragActive ? 'bg-[#e7e7e7]' : ''} cursor-pointer flex-col h-full w-full flex items-center justify-center hover:bg-[#e7e7e7]`,
            })}
          >
            <input {...getInputProps()} id={props.id} />
            <AddSvg />
          </div>
        ) : (
          <div className="relative">
            {/* Preview image */}
            {preview && (
              <img
                src={preview}
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
    </div>
  )
}

export default FileInput
