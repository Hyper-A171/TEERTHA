'use client';

import React from 'react';
import Link from 'next/link';

// Custom class helper (simplified clsx + tailwind-merge equivalent)
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ==========================================
// BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = React.forwardRef<any, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg font-semibold leading-none transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 dark:focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-offset-neutral-950",
      // Sizes
      size === 'sm' && "px-3 py-1.5 text-xs",
      size === 'md' && "px-5 py-2.5 text-sm",
      size === 'lg' && "px-6 py-3 text-base",
      // Variants
      variant === 'primary' && "bg-gradient-to-r from-maroon-800 to-maroon-950 text-white shadow-sm hover:from-maroon-700 hover:to-maroon-900 border border-gold-600/35 hover:border-gold-500/60 shadow-maroon-950/15",
      variant === 'secondary' && "bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-950 shadow-sm hover:from-gold-400 hover:to-gold-500 border border-gold-700/20",
      variant === 'outline' && "border border-maroon-800/45 text-maroon-800 dark:border-gold-500/40 dark:text-gold-400 bg-white/40 dark:bg-neutral-950/20 hover:bg-maroon-50 dark:hover:bg-maroon-950/20",
      variant === 'ghost' && "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800 bg-transparent",
      variant === 'danger' && "bg-red-600 text-white hover:bg-red-700 shadow-md",
      className
    );

    if (href) {
      return (
        <Link ref={ref} href={href} className={classes} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ==========================================
// CARD COMPONENTS
// ==========================================
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel rounded-lg border border-stone-200/70 dark:border-neutral-800/80 overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl leading-none font-semibold text-stone-900 dark:text-white font-serif", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-stone-500 dark:text-stone-400 font-sans", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0 border-t border-stone-100 dark:border-neutral-800/40 mt-4", className)} {...props} />;
}

// ==========================================
// INPUT COMPONENTS
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-stone-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/35 px-3 py-2 text-sm ring-offset-white placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 dark:focus-visible:ring-gold-500 focus-visible:border-transparent transition-all",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ==========================================
// TEXTAREA COMPONENT
// ==========================================
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-stone-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/35 px-3 py-2 text-sm ring-offset-white placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 dark:focus-visible:ring-gold-500 focus-visible:border-transparent transition-all",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// ==========================================
// SELECT COMPONENT (Custom wrapped native select)
// ==========================================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { value: string | number; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, id, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border border-stone-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/35 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 dark:focus-visible:ring-gold-500 focus-visible:border-transparent transition-all appearance-none cursor-pointer",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-stone-100">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ==========================================
// BADGE COMPONENT
// ==========================================
export function Badge({ className, variant = 'default', children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'gold' | 'success' | 'danger' | 'info' }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors font-sans uppercase tracking-wide leading-none",
        variant === 'default' && "bg-maroon-900/10 text-maroon-800 dark:bg-maroon-950/40 dark:text-maroon-400 border border-maroon-900/10",
        variant === 'gold' && "bg-gold-500/10 text-gold-700 dark:bg-gold-500/10 dark:text-gold-400 border border-gold-500/20",
        variant === 'success' && "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border border-green-200/30",
        variant === 'danger' && "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border border-red-200/30",
        variant === 'info' && "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/30",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ==========================================
// DIALOG / MODAL COMPONENT
// ==========================================
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Dialog Content */}
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-stone-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-900 p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-neutral-800/60 mb-4">
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 dark:hover:bg-neutral-800 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DATA TABLE COMPONENTS
// ==========================================
export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto rounded-lg border border-stone-200/60 dark:border-neutral-800/80">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-stone-100 dark:bg-neutral-900/50 border-b border-stone-200 dark:border-neutral-800", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-stone-200 dark:border-neutral-800 transition-colors hover:bg-stone-50/50 dark:hover:bg-neutral-800/30 data-[state=selected]:bg-stone-100 dark:data-[state=selected]:bg-neutral-800",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-semibold text-stone-500 dark:text-stone-400 font-sans uppercase tracking-wider text-xs",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("p-4 align-middle font-sans text-stone-700 dark:text-stone-300", className)} {...props} />;
}
