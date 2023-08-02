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
  editmode: boolean;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});

export function BoardBox({ id, files, children, editmode }: Props) {

  const { attributes, listeners, active, setNodeRef, transform, transition } =
    useSortable({
      id, data: {
        type: "container",
        children: files
      },
      animateLayoutChanges,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={editmode ? setNodeRef : null} style={style} {...attributes} {...listeners} className="my-8 rounded-lg relative w-auto border-solid border-2 border-black bg-white">
        {children}
    </div>
  );
}

