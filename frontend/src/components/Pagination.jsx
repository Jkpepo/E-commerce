import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      
      {/* ⬅️ ANTERIOR */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
          className="  p-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
      >
        Anterior
      </button>

      {/* 🔢 NÚMEROS */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border cursor-pointer ${
            currentPage === page
              ? "bg-gradient-to-r from-cyan-800 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-white"
              : "border-cyan-500/30 text-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* ➡️ SIGUIENTE */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
          className=" p-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
      >
        Siguiente
      </button>
    </div>
  );
};