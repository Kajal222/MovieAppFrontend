import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { DownloadSVG } from '../icons/svg/DownloadSVG';

const baseStyle = {
    flex: 1,
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '100%',
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropFile({ setFilesCallback, files }: any) {

    const onDrop = useCallback((acceptedFiles: any) => {
        if (files)
            setFilesCallback([...files, ...acceptedFiles])
        else setFilesCallback([...acceptedFiles])
    }, [files]);
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/heic': [],
            'image/jfif': [],
        }, onDrop, multiple: false
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    return (
        <div className="container h-full">
            <div {...getRootProps({ isFocused, isDragAccept, isDragReject, style })}>
                <input {...getInputProps()} />
                {files.length > 0 ?
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            marginRight: "10px",
                            position: "relative",
                        }}
                    >
                        <div>
                            <img src={URL.createObjectURL(files[0])} alt="Preview" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                        </div>
                    </div>
                    : <div className=''>
                        <DownloadSVG style={{ textAlign: 'center', margin: 'auto', marginBottom: "10px" }} />
                        Drop an image here
                    </div>
                }
            </div>
        </div>
    );
}
export default DropFile;