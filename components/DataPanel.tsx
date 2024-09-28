'use client';

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Upload, Trash, FileAudio, FileIcon, FileText, Globe } from 'lucide-react'

type FileType = 'Audio transcript' | 'PDF' | 'Text' | 'Web'
type Contributor = 'SmallFrank450' | 'R3s3archLuvr777' | 'NotVeryTrustworthy'

interface File {
  id: string
  name: string
  type: FileType
  contributor: Contributor
  folder: string
  dateAdded: string
}

const initialFiles: File[] = [
  { id: '1', name: 'Interview 1', type: 'Audio transcript', contributor: 'SmallFrank450', folder: 'Interviews', dateAdded: '2023-06-01' },
  { id: '2', name: 'Research Paper', type: 'PDF', contributor: 'R3s3archLuvr777', folder: 'Papers', dateAdded: '2023-06-02' },
  { id: '3', name: 'Notes', type: 'Text', contributor: 'NotVeryTrustworthy', folder: 'Misc', dateAdded: '2023-06-03' },
  { id: '4', name: 'Website Data', type: 'Web', contributor: 'SmallFrank450', folder: 'Web Scrapes', dateAdded: '2023-06-04' },
  // Add more sample data as needed
]

export default function DataPanel() {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof File>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    console.log('Component rendered at:', new Date().toISOString());
  }, []);

  useEffect(() => {
    console.log('Files state updated:', files);
  }, [files]);

  useEffect(() => {
    console.log('Selected files updated:', selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    console.log('Sort column updated:', sortColumn);
  }, [sortColumn]);

  useEffect(() => {
    console.log('Sort direction updated:', sortDirection);
  }, [sortDirection]);

  useEffect(() => {
    console.log('Filter text updated:', filterText);
  }, [filterText]);

  const handleSort = (column: keyof File) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedFiles = [...files].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const filteredFiles = sortedFiles.filter(file =>
    file.name.toLowerCase().includes(filterText.toLowerCase()) ||
    file.type.toLowerCase().includes(filterText.toLowerCase()) ||
    file.contributor.toLowerCase().includes(filterText.toLowerCase()) ||
    file.folder.toLowerCase().includes(filterText.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(new Set(filteredFiles.map(file => file.id)))
    } else {
      setSelectedFiles(new Set())
    }
  }

  const handleSelectFile = (id: string, checked: boolean) => {
    const newSelectedFiles = new Set(selectedFiles)
    if (checked) {
      newSelectedFiles.add(id)
    } else {
      newSelectedFiles.delete(id)
    }
    setSelectedFiles(newSelectedFiles)
  }

  const handleDelete = () => {
    setFiles(files.filter(file => !selectedFiles.has(file.id)))
    setSelectedFiles(new Set())
  }

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'Audio transcript': return <FileAudio className="h-4 w-4" />
      case 'PDF': return <FileIcon className="h-4 w-4" />
      case 'Text': return <FileText className="h-4 w-4" />
      case 'Web': return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter files..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm"
        />
        <div className="space-x-2">
          <Button onClick={() => console.log('Upload clicked')}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
          <Button onClick={handleDelete} variant="destructive" disabled={selectedFiles.size === 0}>
            <Trash className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedFiles.size === filteredFiles.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
              Type {sortColumn === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('contributor')}>
              Contributor {sortColumn === 'contributor' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('folder')}>
              Folder {sortColumn === 'folder' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('dateAdded')}>
              Date Added {sortColumn === 'dateAdded' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Checkbox
                  checked={selectedFiles.has(file.id)}
                  onCheckedChange={(checked) => handleSelectFile(file.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <span className="ml-2">{file.type}</span>
                </div>
              </TableCell>
              <TableCell>{file.contributor}</TableCell>
              <TableCell>{file.folder}</TableCell>
              <TableCell>{file.dateAdded}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}