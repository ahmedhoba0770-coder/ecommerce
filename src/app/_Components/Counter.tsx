"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaPlus, FaMinus } from "react-icons/fa"

type Props = {
  onChange?: (count: number) => void
}

export default function Counter({ onChange }: Props) {
  const [count, setCount] = useState(1)

  const update = (val: number) => {
    setCount(val)
    onChange?.(val)
  }

  return <>
    <span className="block text-sm font-medium text-gray-700 mb-2">Quantity</span>
    <div className="flex items-center w-fit border-2 border-gray-200 rounded-lg overflow-hidden">
      <Button
        onClick={() => update(Math.max(1, count - 1))}
        className="px-4 py-3 h-13 bg-white text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
      >
        <FaMinus />
      </Button>
      <span className="w-16 text-center text-lg font-medium">{count}</span>
      <Button
        onClick={() => update(count + 1)}
        className="px-4 py-3 h-13 bg-white text-gray-600 hover:bg-gray-100 transition"
      >
        <FaPlus />
      </Button>
    </div>
  </>
}