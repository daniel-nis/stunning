"use client"

import { FileUploadForm } from "@/components/FileUpload";
import { WebsiteUploadForm } from "@/components/WebsiteUpload";

export default function Submit() {
    return (
        <div>
            <p>Help curate this list by submitting a website that you think is stunning!</p>
            {/* <FileUploadForm /> */}
            <WebsiteUploadForm />
        </div>
    )
}