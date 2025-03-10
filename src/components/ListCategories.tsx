"use client"
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ListCategories() {

    const Categories = useSelector((state:RootState) => state.categories)
  return (
    <div>ListCategories</div>
  )
}
