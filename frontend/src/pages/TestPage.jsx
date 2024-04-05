import React from 'react';
import onFileUpload from '../utils/fileUpload';

function TestPage() {
    return (
        <div>
            Add Image Here
            <input type="file" onChange={onFileUpload} />
        </div>
    );
}

export default TestPage;
