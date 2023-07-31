"use client"
import React, { useState } from "react";
import {  AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GridBox from "../grid/GridBox";
import CollectionTag from "./CollectionTag";
import { FilterComponent } from "./FilterDiv";
import { CollectionFunc, Conditions, FilterFunc, File } from "@/ts/interfaces/dashboard";
import {  UniqueIdentifier } from "@dnd-kit/core";

interface Props { 
  id: UniqueIdentifier;
  index: number;
  files: File[];
  collection_name: string;
  children: React.ReactNode;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});

export function BoardBox({ id, files, collection_name, children }: Props) {

  const { attributes, listeners, over, active, setNodeRef, transform, transition } =
    useSortable({
      id, data: {
        type: "container",
        children: files
      },
      animateLayoutChanges,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="my-8 rounded-lg relative w-4/5 border-solid border-2 border-black">
        {children}
    </div>
  );
}

