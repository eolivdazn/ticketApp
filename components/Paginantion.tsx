"use client"
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currantePage: number;
}

const Paginantion = ({ itemCount, pageSize, currantePage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router= useRouter()
  const searchParams = useSearchParams()

  if (pageCount <= 1) return null;

  const changePage= (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page",page.toString())
    router.push("?"+params.toString())
  }

  return (
    <div>
      <div className="mt-2">    
        <Button variant="outline" disabled={currantePage === 1} onClick={()=> changePage(1)} >
          <ChevronsLeft></ChevronsLeft>
        </Button>
        <Button variant="outline" disabled={currantePage === 1} onClick={()=> changePage(currantePage - 1)}>
          <ChevronLeft></ChevronLeft>
        </Button>
        <Button variant="outline" disabled={currantePage === pageCount} onClick={()=> changePage(currantePage + 1)} >
          <ChevronRight></ChevronRight>
        </Button>
        <Button variant="outline" disabled={currantePage === pageCount} onClick={()=> changePage(1)}>
          <ChevronsRight></ChevronsRight>
        </Button>
      </div>
      <p className="mt-2">{"Page " + currantePage + " of " + pageCount}</p>
    </div>
  );
};

export default Paginantion;
