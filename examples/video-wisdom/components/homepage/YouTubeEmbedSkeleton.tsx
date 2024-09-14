import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function Loader() {
  return (
    <>
      <div className="sm:min-w-[500px] min-h-[150px] max-w-full md:mx-auto shadow-md flex gap-4 bg-muted p-5 justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[120px] sm:w-[250px]" />
          <Skeleton className="h-5 w-[120px] sm:w-[250px]" />
          <Skeleton className="h-4 mt-4 w-[80px] sm:w-[120px]" />
        </div>
        <Skeleton className="h-27 sm:h-32 w-28 sm:w-48 rounded-lmd" />
      </div>
    </>
  )
}