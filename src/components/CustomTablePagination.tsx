import { Button } from "@heroui/button";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@heroui/pagination";

const ChevronIcon = ({ style }: { style?: string }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className={style}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

const CustomTablePagination = ({
  page,
  pages,
  onPageSelect,
}: {
  page: number;
  pages: number;
  onPageSelect: (page: number) => void;
}) => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
  }: PaginationItemRenderProps) => {
    const navigBtnStyle =
      "bg-gray-200 p-1 mx-1 rounded-md sm:p-1 sm:mx-1 [&>svg]:max-sm:w-3";
    if (value === PaginationItemType.NEXT) {
      return (
        <Button key={key} className={navigBtnStyle} onPress={onNext}>
          <ChevronIcon style="rotate-180" />
        </Button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <Button key={key} className={navigBtnStyle} onPress={onPrevious}>
          <ChevronIcon />
        </Button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return null;
    }

    return (
      <Button
        key={key}
        ref={ref}
        className={`
          ${"w-5 h-5 p-0 sm:w-8 sm:h-8 max-sm:text-[10px]"}
          ${isActive && "bg-gray-200 rounded-2xl"}
        `}
        onPress={() => setPage(value)}
      >
        {value}
      </Button>
    );
  };

  return (
    <Pagination
      boundaries={3}
      showControls
      page={page}
      total={pages}
      onChange={onPageSelect}
      renderItem={renderItem}
      className="py-4"
      classNames={{
        wrapper: "[&>span]:hidden",
      }}
    />
  );
};

export default CustomTablePagination;
