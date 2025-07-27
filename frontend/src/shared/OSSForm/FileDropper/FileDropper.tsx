"use client";

import React, { useCallback, useState, useRef } from "react";
import styles from "./FileDropper.module.css";
import BaseInput from "../BaseInput/BaseInput";
import { Upload } from "lucide-react";

type FileDropperProps = {
    onFileDrop: (files: FileList) => void;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    accept?: string;
    multiple?: boolean;
};

export default function FileDropper({
    onFileDrop,
    disabled = false,
    error,
    placeholder = "Drop files here or click to browse",
    accept,
    multiple = false,
}: FileDropperProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) {
                setIsDragging(true);
            }
        },
        [disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (disabled) return;

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                setSelectedFiles(files);
                onFileDrop(files);
            }
        },
        [disabled, onFileDrop],
    );

    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                setSelectedFiles(files);
                onFileDrop(files);
            }
        },
        [onFileDrop],
    );

    const handleClick = useCallback(() => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [disabled]);

    const getDisplayText = () => {
        if (selectedFiles) {
            if (selectedFiles.length === 1) {
                return selectedFiles[0].name;
            } else {
                return `${selectedFiles.length} files selected`;
            }
        }
        return "";
    };

    return (
        <div
            className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
        >
            <BaseInput
                type="text"
                value={getDisplayText()}
                disabled={disabled}
                error={error}
                placeholder={placeholder}
                style={styles.dropText}
            />
        </div>
    );
}
