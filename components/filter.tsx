import React from "react";

import styles from "../styles/Filter.module.css";

export type Tag = {
  name: string;
  count: number;
};

interface IFilterSelect {
  tags: Tag[];
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function updateFilters(
  tagName: string,
  add: boolean,
  setFilters: React.Dispatch<React.SetStateAction<string[]>>
) {
  setFilters((oldState: string[]) => {
    if (add) {
      if (oldState.includes(tagName)) return;
      return [...oldState, tagName];
    } else {
      if (!oldState.includes(tagName)) return;
      return oldState.filter((t: string) => t != tagName);
    }
  });
}

const FilterSelect = ({ tags, filters, setFilters }: IFilterSelect) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const toggleShow = () => setShowAll((oldShowAll) => !oldShowAll);
  const cutoff = 4;
  return (
    <div className={styles.container}>
      {tags.map((tag: Tag) => {
        let visible = true;
        if (showAll === false && tag.count < cutoff) {
          visible = false;
        }
        return (
          <FilterBox
            key={tag.name}
            tag={tag}
            visible={visible}
            enabled={filters.includes(tag.name)}
            setFilters={setFilters}
          />
        );
      })}
      {showAll ? (
        <div onClick={toggleShow} className={styles.filterButton}>
          <div className={styles.filterTagName}>Show Less...</div>
        </div>
      ) : (
        <div onClick={toggleShow} className={styles.filterButton}>
          <div className={styles.filterTagName}>Show More...</div>
        </div>
      )}
    </div>
  );
};

interface IFilterBox {
  tag: Tag;
  visible: boolean;
  enabled: boolean;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterBox = React.memo(
  ({ tag, enabled, visible, setFilters }: IFilterBox) => {
    return (
      <div
        className={styles.filterButton}
        style={{
          color: enabled ? "lightgreen" : "inherit",
          display: visible ? "inherit" : "none",
        }}
        key={tag.name}
        onClick={(_e) => {
          updateFilters(tag.name, !enabled, setFilters);
        }}
      >
        <div className={styles.filterTagName}>{tag.name}</div>
        <div className={styles.filterCount}>{tag.count}</div>
      </div>
    );
  }
);

FilterBox.displayName = "FilterBox";

export default FilterSelect;
