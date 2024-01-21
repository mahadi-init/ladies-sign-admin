"use client";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

const tableItems = [
  {
    name: "Ayub Salas",
    role: "Designer",
    company: "Carroll Group",
    status: "Member",
  },
  {
    name: "Agnes Sherman",
    role: "Developer",
    company: "Apple",
    status: "Admin",
  },
  {
    name: "Jemma Cummings",
    role: "Senior Designer",
    company: "20goto10",
    status: "Member",
  },
  {
    name: "John Doe",
    role: "Engineer",
    company: "TechCorp",
    status: "Admin",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    company: "Innovate Ltd.",
    status: "Member",
  },
  {
    name: "Michael Johnson",
    role: "QA Analyst",
    company: "Quality Solutions",
    status: "Admin",
  },
  {
    name: "Emily Davis",
    role: "Graphic Designer",
    company: "Creative Minds",
    status: "Member",
  },
  {
    name: "Chris Evans",
    role: "Software Developer",
    company: "CodeCrafters",
    status: "Member",
  },
  {
    name: "Sophia Miller",
    role: "Marketing Specialist",
    company: "AdvertiseNow",
    status: "Admin",
  },
  {
    name: "Robert Wilson",
    role: "Data Scientist",
    company: "Data Insights",
    status: "Member",
  },
  {
    name: "Olivia Brown",
    role: "UX/UI Designer",
    company: "DesignHub",
    status: "Admin",
  },
  {
    name: "William Turner",
    role: "Project Manager",
    company: "Project Innovations",
    status: "Member",
  },
];

export default function Table() {
  const ths = ["id", "name", "product type", "items", "action"];

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table
          className="w-full text-left rounded border-collapse w-overflow-x-auto"
          cellSpacing="0"
        >
          <tbody>
            <tr className="border-b border-slate-300">
              {ths.map((item, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 h-12 text-sm font-medium stroke-slate-700 text-slate-700"
                  >
                    {item.toUpperCase()}
                  </th>
                );
              })}
            </tr>
            {tableItems.map((item, index) => (
              <tr key={index} className="font-medium border-b border-slate-200">
                {Object.keys(item).map((key, subIndex) => (
                  <td
                    key={subIndex}
                    className="px-6 h-12 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-700"
                  >
                    {/*@ts-ignore*/}
                    {item[key]}
                  </td>
                ))}
                <td className="flex gap-4 justify-center items-center mt-2">
                  <button className="inline-flex gap-2 justify-center items-center self-center px-4 h-8 text-xs font-medium tracking-wide text-white whitespace-nowrap bg-rose-500 rounded-full transition duration-300 hover:bg-rose-600 focus:bg-rose-700 focus-visible:outline-none disabled:bg-rose-300 disabled:border-rose-300 disabled:shadow-none disabled:cursor-not-allowed">
                    <span className="relative only:-mx-4">
                      <Pencil size={15} />
                    </span>
                  </button>
                  <button className="inline-flex gap-2 justify-center justify-self-center items-center self-center px-4 h-8 text-xs font-medium tracking-wide text-rose-500 whitespace-nowrap bg-rose-50 rounded transition duration-300 hover:text-rose-600 hover:bg-rose-100 focus:text-rose-700 focus:bg-rose-200 focus-visible:outline-none disabled:text-rose-400 disabled:bg-rose-100 disabled:border-rose-300 disabled:shadow-none disabled:cursor-not-allowed">
                    <span className="relative only:-mx-4">
                      <Trash2 size={15} />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
