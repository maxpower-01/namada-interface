import clsx from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type SelectBoxOption<T extends string> = {
  id: T;
  value: React.ReactNode;
  ariaLabel: string;
};

export type SelectBoxProps<T extends string> = {
  id: string;
  value: T;
  displayArrow?: boolean;
  listContainerProps?: React.ComponentPropsWithoutRef<"ul">;
  containerProps?: React.ComponentPropsWithoutRef<"div">;
  listItemProps?: React.ComponentPropsWithoutRef<"li">;
  arrowContainerProps?: React.ComponentPropsWithoutRef<"i">;
  labelProps?: React.ComponentPropsWithoutRef<"label">;
  defaultValue?: React.ReactNode;
  options: SelectBoxOption<T>[];
} & React.ComponentPropsWithRef<"input">;

export const StyledSelectBox = <T extends string = string>({
  id,
  options,
  value,
  onChange,
  containerProps = {},
  listItemProps = {},
  listContainerProps = {},
  arrowContainerProps = {},
  labelProps = {},
  displayArrow = true,
  defaultValue,
  ...props
}: SelectBoxProps<T>): JSX.Element => {
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.id === value);

  useEffect(() => {
    const close = (): void => setOpen(false);
    if (open) {
      document.documentElement.addEventListener("click", close);
    }
    return () => {
      document.documentElement.removeEventListener("click", close);
    };
  }, [open]);

  const getElementId = (optionId: string): string => `radio-${id}-${optionId}`;

  const { className: containerClassList, ...otherContainerProps } =
    containerProps;
  const { className: listContainerClassList, ...otherListContainerProps } =
    listContainerProps;
  const { className: arrowClassList, ...otherArrowProps } = arrowContainerProps;
  const { className: listItemClassList, ...otherListItemProps } = listItemProps;
  const { className: labelClassList, ...otherLabelProps } = labelProps;

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <fieldset
        role="radiogroup"
        className="absolute pointer-events-none invisible"
      >
        {options.map((option: SelectBoxOption<T>) => (
          <input
            key={`radio-${id}-${option.id}`}
            id={getElementId(option.id)}
            type="radio"
            value={option.id}
            checked={value === option.id}
            aria-label={option.ariaLabel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (onChange) onChange(e);
            }}
            {...props}
          />
        ))}
      </fieldset>
      <div>
        <div
          className={twMerge(
            "group inline-flex items-center relative select-none",
            "font-medium cursor-pointer pr-4 active:top-px",
            clsx({
              "opacity-50": open,
            }),
            containerClassList
          )}
          role="button"
          onClick={() => {
            if (props.disabled) return;
            setOpen(!open);
          }}
          {...otherContainerProps}
        >
          {selected ? selected.value : defaultValue}
          {displayArrow && (
            <i
              className={twMerge(
                clsx(
                  "absolute right-0 rotate-45 border-r border-b w-[5px] h-[5px] border-current",
                  "origin-top",
                  { "rotate-[-135deg] translate-y-[0.35em]": open }
                ),
                arrowClassList
              )}
              {...otherArrowProps}
            />
          )}
        </div>
        <ul
          className={twMerge(
            "hidden absolute top-[2.5em] left-1/2 -translate-x-1/2 flex-col hidden",
            "rounded-sm pt-2 pb-3 px-5 cursor-pointer bg-black z-[9999]",
            clsx({ flex: open }),
            listContainerClassList
          )}
          {...otherListContainerProps}
        >
          {options.map((option, idx) => (
            <li
              key={`selectbox-item-${id}-${option.id}`}
              className={twMerge(
                clsx("group/item", {
                  "border-b border-current": idx < options.length - 1,
                }),
                listItemClassList
              )}
              onClick={() => setOpen(false)}
              {...otherListItemProps}
            >
              <label
                className={twMerge(
                  "block cursor-pointer py-2",
                  "group-hover/item:text-cyan transition-color duration-150",
                  labelClassList
                )}
                htmlFor={getElementId(option.id)}
                {...otherLabelProps}
              >
                {option.value}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
